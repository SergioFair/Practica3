var World = {
	loaded: false,
	targetCollectionResource: null,
	tracker: null,

	init: function initFn() {
	    this.createOverlays();
	    this.createModelAtLocation();
	},

	createModelAtLocation: function createModelAtLocationFn() {

    		/*
    			First a location where the model should be displayed will be defined
    			. This location will be relativ to the user.
    		*/
    		var location = new AR.RelativeLocation(null, 5, 0, 2);

    		/*
    			Next the model object is loaded.
    		*/
    		var instrucciones = new AR.HtmlDrawable({html:"<div>La finalidad de nuestra aplicación es ayudar a<br>los niños. Sabemos lo importante que es aprender<br>inglés hoy en día, por eso queremos enseñarles<br>los nombres de algunos animales. La idea<br>es que el niño apunte a algún target (hogar<br>de algún animal), y automáticamente verá<br>a dicho animal, con el que podrá interactuar.</div>"}, 7, {
                                  offsetX : 1,
                                  backgroundColor: "#EEEEEE"
                                });

            var indicatorImage = new AR.ImageResource("assets/marker.png");

            var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
            });

    		/*
    			Putting it all together the location and 3D model is added to an AR.GeoObject.
    		*/
    		var obj = new AR.GeoObject(location, {
                drawables: {
                   cam: [instrucciones],
                   indicator: [indicatorDrawable]
                }
            });
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

		var overlayCatInfo = new AR.HtmlDrawable({
                			uri: "assets/cat.html"
                		}, 0.7, {
                			viewportWidth: 400,
                			viewportHeight: 120,
                			backgroundColor: "#FFFFFF",
                			translate: { x: -0.2, y: -0.5},
                		});

		this.pageCat = new AR.ImageTrackable(this.tracker, "cathouse", {
		    drawables: {
		        cam: [overlayCat, overlayCatInfo] ,
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

		var overlayDogInfo = new AR.HtmlDrawable({
        			uri: "assets/dog.html"
        		}, 0.7, {
        			viewportWidth: 400,
        			viewportHeight: 120,
        			backgroundColor: "#FFFFFF",
        			translate: { x: 0.2, y: -0.5},
        		});

		this.pageDog = new AR.ImageTrackable(this.tracker, "doghouse", {
		    drawables: {
		        cam: [overlayDog, overlayDogInfo] ,
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

		var overlayChickenInfo = new AR.HtmlDrawable({
                			uri: "assets/chicken.html"
                		}, 0.7, {
                			viewportWidth: 400,
                			viewportHeight: 120,
                			backgroundColor: "#FFFFFF",
                			translate: { x: -0.3, y: 0.5},
                		});

		this.pageChicken = new AR.ImageTrackable(this.tracker, "henhouse", {
		    drawables: {
		        cam: [overlayChicken, overlayChickenInfo] ,
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
	        e.innerHTML = "Si quieres saber como se dice 'Gallina' \n en inglés, pulsa en la imagen";
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
        World.loaded = false;
    }
};
World.init();