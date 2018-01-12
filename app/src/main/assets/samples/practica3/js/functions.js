var World = {
	loaded: false,
	targetCollectionResource: null,
	tracker: null,

	init: function initFn() {
	    this.createOverlays();
	},

	createOverlays: function createOverlaysFn(){
	    this.targetCollectionResource = new AR.TargetCollectionResource("assets/practica3.wtc", {
	            onLoaded: function() {
	                document.getElementById('loadingMessage').innerHTML = "<div> Targets cargados </div>";
	            },
	            onError: function(errorMessage){
                    alert(errorMessage);
                    document.getElementById('loadingMessage').innerHTML = "<div> Error cargando targets </div>";
                }
        });


        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded,
            onError: function (errorMessage) {
            	alert(errorMessage);
            	document.getElementById('loadingMessage').innerHTML = "<div> Error creando tracker </div>";
            }
        });

		var imgCat = new AR.ImageResource("assets/cat.png");
		var overlayCat = new AR.ImageDrawable(imgCat, 5, {
            translate: {
                x: -0.15,
            }
		});

		this.pageCat = new AR.ImageTrackable(this.tracker, "cathouse", {
		    drawables: {
		        cam: overlayCat,
		    },
		    onImageRecognized: this.removeLoadingBar,
		    onError: function(errorMessage) {
		        alert(errorMessage);
                document.getElementById('loadingMessage').innerHTML = "<div> Error creando image trackable </div>";
		    }
		});

	},

	removeLoadingBar: function removeLoadingBarFn() {
	    if(!World.loaded) {
	        var e = document.getElementById('loadingMessage');
	        e.parentElement.removeChild(e);
	        World.loaded = true;
	    }
	},


	loadPois: function loadPoisFn(poiData) {		
		
		World.markerDrawable = new AR.ImageResource("assets/marker.png");

		var currentLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
		// el marcador estará a 1 metro al norte del usuario
		var markerLocation = new AR.RelativeLocation(geoLoc, 1,0, 0);
		var markerImageDrawable_idle = new AR.ImageDrawable(World.markerDrawable, 2.5, {
			zOrder: 0,
			opacity: 1.0
		});

		// create GeoObject
		var markerObject = new AR.GeoObject(markerLocation, {
			drawables: {
				cam: [markerImageDrawable_idle]
			}
		});
	},		

    worldLoaded: function worldLoadedFn(){
        document.getElementById('loadingMessage').innerHTML = "<div> Mundo cargado </div>";
    }
};
World.init();