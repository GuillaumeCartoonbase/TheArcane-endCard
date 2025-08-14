const charFace = 2;
const charHair = 1;
const charHairColor = 1;
const charSkin = 1;
const metier = 3;

const getWheel = 3;
const getHobby = 2;
const getEmotion = 1;
const getLesson = 1;
const getHero = 4;
const getBG = 2;
const getCard = 5;
const bag = [1, 2, 3];

const metiers = [
	"aérospatial",
	"robotique",
	"Informatique et Numérique",
	"beauté",
	"mode",
	"Transports et Logistique",
	"environnement et énergie",
	"Agriculture, Agroalimentaire",
	"Data, Cyber\net Télécommunications",
	"gaming",
	"maritime",
	"cinéma/audiovisuel",
	"Urbanisme, Infrastructures,\nArchitecture et Design",
	"automobile",
	"santé",
];

const stateMachine = "State Machine 1";

const riveInstance = new rive.Rive({
	src: "the_arcane-chara.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
	autoBind: true,
});

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	const inputs = riveInstance.stateMachineInputs(stateMachine);

	// Setup inputs
	BG = inputs.find((i) => i.name === "BG");
	card = inputs.find((i) => i.name === "card");

	// Use inputs
	BG.value = getBG;
	card.value = getCard;
	riveInstance.setNumberStateAtPath("heroineInput", getHero, "heroine");
	riveInstance.setNumberStateAtPath(
		"emotionInput",
		getEmotion,
		"Avatar/outfit front/ecusson"
	);
	riveInstance.setNumberStateAtPath("bagInput", bag[0], "bag 1");
	riveInstance.setNumberStateAtPath("bagInput", bag[1], "bag 2");
	riveInstance.setNumberStateAtPath("bagInput", bag[2], "bag 3");
	riveInstance.setNumberStateAtPath("roomInput", getHobby, "room");
	riveInstance.setNumberStateAtPath("lessonInput", getLesson, "lesson");
	riveInstance.setNumberStateAtPath("wheelInput", getWheel, "wheel");

	//Face inputs
	riveInstance.setNumberStateAtPath("face", charFace, "Avatar");
	riveInstance.setNumberStateAtPath("skin", charSkin, "Avatar");
	riveInstance.setNumberStateAtPath("hair", charHair, "Avatar");
	riveInstance.setNumberStateAtPath("hairColor", charHairColor, "Avatar");
	riveInstance.setNumberStateAtPath("clothes", metier, "Avatar");
	riveInstance.setTextRunValue("metier", metiers[metier - 1].toUpperCase());
}

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	console.log(eventName);
	const eventKey = eventName;
	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		default:
			console.log("Unhandled event:", eventName, "\n", riveEvent);
			break;
	}
};
// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);
