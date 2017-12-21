//Las imágenes de los animales han sido obtenidas de: http://www.dapino-colada.nl/6-animals-transparent-pngs
//AR.logger.activateDebugMode();
var World = {
	loaded: false,
	animalsInfo: null,

	init: function initFn() {


        this.targetCollectionResource = new AR.TargetCollectionResource("assets/zoov71.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
        });



	 this.animalsInfo = [{
				name: "Skunk",
                image: "assets/skunk.png",
				sound: "assets/skunk.mp3", //asociando el sonido del animal
                ex: -0.5,
        		ey: -0.85,
                description: "Skunks are mammals known for their ability to spray a liquid with a strong odor"
				}, //MOFETA

				{
				name: "Squirrel",
                image: "assets/squirrel.png",
                sound:"assets/squirrel.mp3",
                ex: -0.85,
        		ey: 0,
                description: "Squirrels belong to family Sciuridae of small or medium-sized rodents. The family includes tree squirrels, ground squirrels, chipmunks or marmots"
				}, //ARDILLA
				{
				name: "Donkey",
                image: "assets/donkey.png",
				sound:"assets/donkey.mp3",
                ex: -0.5,
        		ey: 0.85,
                description: "The donkey or ass, Equus africanus asinus, is a domesticated member of the Equidae or horse family"
				}, //BURRO

				{
				name: "Chinchilla",
                image: "assets/chinchilla.png",
				sound: "assets/chinchilla.mp3",
                ex: 0.5,
        		ey: -0.85,
                description: "Chinchillas are crepuscular rodents, slightly larger and more robust than ground squirrels, native to the Andes mountains in South America"
				}, //CHINCHILLA

				{
				name: "Walrus",
                image: "assets/walrus.png",
				sound: "assets/walrus.mp3",
                ex: 0.85,
        		ey: 0,
                description: "The walrus is a large flippered marine mammal with a discontinuous distribution about the North Pole in the Arctic Ocean and subarctic seas of the Northern Hemisphere"
				}, //MORSA

				{
				name: "Penguin",
                image: "assets/penguin.png",
				sound: "assets/penguin.mp3",
                ex: 0.5,
        		ey: 0.85,
                description: "Penguins are a group of aquatic, flightless birds living almost exclusively in the Southern Hemisphere, especially in Antarctica"
				} //PINGUINO
    ];


    var animals = [];
    for (var i=0; i < this.animalsInfo.length; i++){
        var info = this.animalsInfo[i];

        var imgUni = new AR.ImageResource(info.image);
        animals[i] = new AR.ImageDrawable(imgUni, 1, {

            translate:{
                x: info.ex,
                y: info.ey
            },
            onClick : this.animalClicked(info)
        });
    }

		var overlay = new AR.ImageTrackable(this.tracker, "*", {
			drawables: {
				cam: animals
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});
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
            var animalSound = new AR.Sound(info.sound, {
                            });
            animalSound.play();
			document.getElementById("animalName").innerHTML = info.name;
            document.getElementById("animalDescription").innerHTML = info.description;
            document.getElementById("infoAnimal").setAttribute("class", "infoAnimalVisible");

        };
	}
};

World.init();