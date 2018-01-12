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
		var overlayCat = new AR.ImageDrawable(imgCat, 0.4, {
            translate: {
                x: 0.15,
                y: 0.1,
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
            },
            onClick: function(){
                responsiveVoice.speak("Cat");
            }
		});

		this.pageCat = new AR.ImageTrackable(this.tracker, "cathouse", {
		    drawables: {
		        cam: overlayCat,
		    },
		    onImageRecognized: this.removeLoadingBarCat,
		    onImageLost: this.worldLoaded,
		    onError: function(errorMessage) {
		        alert(errorMessage);
                document.getElementById('loadingMessage').innerHTML = "<div> Error creando image trackable </div>";
		    }
		});
		
		
		var imgDog = new AR.ImageResource("assets/dog.png");
		var overlayDog = new AR.ImageDrawable(imgDog, 0.5, {
            translate: {
                x: -0.5,
                y: -0.2,
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
            },
            onClick: function(){
                responsiveVoice.speak("Dog");
            }
		});

		this.pageDog = new AR.ImageTrackable(this.tracker, "doghouse", {
		    drawables: {
		        cam: overlayDog,
		    },
		    onImageRecognized: this.removeLoadingBarDog,
		    onImageLost: this.worldLoaded,
		    onError: function(errorMessage) {
		        alert(errorMessage);
                document.getElementById('loadingMessage').innerHTML = "<div> Error creando image trackable </div>";
		    }
		});
		
		
		var imgChicken = new AR.ImageResource("assets/chicken.png");
		var overlayChicken = new AR.ImageDrawable(imgChicken, 0.5, {
            translate: {
                x: 0.3,
            },
            onClick: function(){
                responsiveVoice.speak("Chicken");
            }
		});

		this.pageChicken = new AR.ImageTrackable(this.tracker, "henhouse", {
		    drawables: {
		        cam: overlayChicken,
		    },
		    onImageRecognized: this.removeLoadingBarChicken,
		    onImageLost: this.worldLoaded,
		    onError: function(errorMessage) {
		        alert(errorMessage);
                document.getElementById('loadingMessage').innerHTML = "<div> Error creando image trackable </div>";
		    }
		});
		
		
		var imgHorse = new AR.ImageResource("assets/horse.png");
		var overlayHorse = new AR.ImageDrawable(imgHorse, 0.5, {
            translate: {
                x: -0.5,
                y: -0.3,
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
            },
            onClick: function(){
                responsiveVoice.speak("Horse");
            }
		});
		
		var imgCow = new AR.ImageResource("assets/cow.png");
		var overlayCow = new AR.ImageDrawable(imgCow, 0.5, {
            translate: {
                x: 0.5,
                y: -0.3,
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
			},
            onClick: function(){
                responsiveVoice.speak("Cow");
            }
		});
		
		this.pageBarn = new AR.ImageTrackable(this.tracker, "barn", {
		    drawables: {
            	cam: [overlayHorse, overlayCow] ,
            },
            onImageRecognized: this.removeLoadingBarBarn,
		    onImageLost: this.worldLoaded,
		    onError: function(errorMessage) {
		        alert(errorMessage);
                document.getElementById('loadingMessage').innerHTML = "<div> Error creando image trackable </div>";
		    }
		});

	},

	removeLoadingBarCat: function removeLoadingBarCatFn() {
	    if(!World.loaded) {
	        var e = document.getElementById('loadingMessage');
	        e.innerHTML = "Si quieres saber como se dice 'gato' \n en inglés, pulsa en la imagen";
	        World.loaded = true;
	    }
	},

	removeLoadingBarDog: function removeLoadingBarDogFn() {
	    if(!World.loaded) {
	        var e = document.getElementById('loadingMessage');
	        e.innerHTML = "Si quieres saber como se dice 'perro' \n en inglés, pulsa en la imagen";
	        World.loaded = true;
	    }
	},
	
	removeLoadingBarChicken: function removeLoadingBarChickenFn() {
	    if(!World.loaded) {
	        var e = document.getElementById('loadingMessage');
	        e.innerHTML = "Si quieres saber como se dice 'Chicken' \n en inglés, pulsa en la imagen";
	        World.loaded = true;
	    }
	},
	
	
	removeLoadingBarBarn: function removeLoadingBarBarnFn() {
    	    if(!World.loaded) {
    	        var e = document.getElementById('loadingMessage');
    	        e.innerHTML = "Si quieres saber como se dice 'caballo' o 'vaca' en inglés, pulsa en la imagen de cada animal";
    	        //e.parentElement.removeChild(e);
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
        document.getElementById('loadingMessage').innerHTML = "<div> ¿Quién vive aquí? </div>";
    }
};
World.init();