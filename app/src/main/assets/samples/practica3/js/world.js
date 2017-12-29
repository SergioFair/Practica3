//Las imágenes de los animales han sido obtenidas de: http://www.dapino-colada.nl/6-animals-transparent-pngs
//AR.logger.activateDebugMode();
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

		this.imgCat = new AR.ImageResource("assets/cat.png");
		this.overlayCat = new AR.ImageDrawable(imgCat, 5, {
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

	removeLoadingBar: function() {
	    if(!World.loaded) {
	        var e = document.getElementById('loadingMessage');
	        e.parentElement.removeChild(e);
	        World.loaded = true;
	    }
	},

    worldLoaded: function worldLoadedFn(){
        document.getElementById('loadingMessage').innerHTML = "<div> Mundo cargado </div>";
    }
};
World.init();