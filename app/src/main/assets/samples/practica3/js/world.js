//Las imágenes de los animales han sido obtenidas de: http://www.dapino-colada.nl/6-animals-transparent-pngs
//AR.logger.activateDebugMode();
var World = {
	loaded: false,
	animalsInfo: null,

	init: function initFn() {


        this.targetCollectionResource = new AR.TargetCollectionResource("assets/practica3.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
        });



	 this.animalsInfo = [{
	            name: "Cat",
                image: "assets/cat.png"
     			},
     			{
				name: "Chicken",
                image: "assets/chicken.png"
				},
                {
				name: "Cow",
                image: "assets/cow.png"
				},
                {
				name: "Dog",
                image: "assets/dog.png"
				},
                {
				name: "Horse",
                image: "assets/horse.png"
				}
    ];


    var animals = [];
    for (var i=0; i < this.animalsInfo.length; i++){
        var info = this.animalsInfo[i];


        var imgUni = new AR.ImageResource(info.image);
        animals[i] = new AR.ImageDrawable(imgUni, 1, {

            translate:{
                x: -0.85,
        		y: 0
            },
            onClick : this.animalClicked(info)
        });
        info.animation = this.setAnimation(animals[i]);
    }

		var overlay = new AR.ImageTrackable(this.tracker, "*", {
			drawables: {
				cam:  animals
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});
		//overlay.drawables.AddCamDrawable(buttonZoo);

	},

	removeLoadingBar: function() {
		if (!World.loaded) {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
			World.loaded = true;
		}
	},

	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivLeft + ">Imagenes en el zoo:</div>"+
			"<div" + cssDivRight + "><img src='assets/surfer.png'></img></div>";

	},

	//cuando se pulsa sobre un animal, el animal emite un ruido
	animalClicked: function(info){

      return function() {
           /* var animalSound = new AR.Sound(info.sound, {
                            });
            animalSound.play();
			document.getElementById("animalName").innerHTML = info.name;
            document.getElementById("animalDescription").innerHTML = info.description;
            document.getElementById("infoAnimal").setAttribute("class", "infoAnimalVisible");
            info.animation.start();*/
            responsiveVoice.speak(info.animalName);

        };
	},

	setAnimation: function(drawable){
		var bigger = new AR.PropertyAnimation(drawable, "scale", 0.3, 1.3, 1000, {
			type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
		}); //desde el 30% del tamaño original hasta el 130% en un segundo
	    var smaller = new AR.PropertyAnimation(drawable, "scale", 1.3, 1, 1000, {
			type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
		}); //desde el 130% del tamaño original hasta el tamaño original en otro segundo

		return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.SEQUENTIAL, [bigger, smaller]);
	},

};

World.init();