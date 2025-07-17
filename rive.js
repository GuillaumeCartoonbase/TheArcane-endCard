const metier = 1;

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

	work = inputs.find((i) => i.name === "work");
	hobby = inputs.find((i) => i.name === "hobby");
	emotion = inputs.find((i) => i.name === "emotion");
	lesson = inputs.find((i) => i.name === "lesson");
	hero = inputs.find((i) => i.name === "hero");
	BG = inputs.find((i) => i.name === "BG");
	card = inputs.find((i) => i.name === "card");

	work.value = 1;
	hobby.value = 1;
	emotion.value = 3;
	lesson.value = 3;
	hero.value = 3;
	BG.value = 4;
	card.value = 2;

	riveInstance.setNumberStateAtPath("face", 5, "Avatar");
	riveInstance.setNumberStateAtPath("skin", 4, "Avatar");
	riveInstance.setNumberStateAtPath("hair", 1, "Avatar");
	riveInstance.setNumberStateAtPath("hairColor", 1, "Avatar");
	riveInstance.setNumberStateAtPath("clothes", metier, "Avatar");
	riveInstance.setTextRunValue("metier", metiers[metier - 1].toUpperCase());

	riveInstance.setNumberStateAtPath("adv", 3, "adventure A");
	riveInstance.setNumberStateAtPath("adv", 4, "adventure B");
	riveInstance.setNumberStateAtPath("adv", 2, "adventure C");
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
