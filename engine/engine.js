import "./SceneManager.js"
import "./Component.js"
import "./Scene.js"
import "./GameObject.js"
import "./Transform.js"
import "./Circle.js"

//True if the gamee is paused, false otherwise
let pause = false

//-----------------------------------------------------------
//Input Event handling
//-----------------------------------------------------------

//Get references to the canvas element and 
//the 2d context
let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d");

//Store the state of the user input
//This will be in its own file eventually
let keysDown = []
let mouseX;
let mouseY

//Add event handlers so we capture user input
//Note the strings has to be all lowercase, e.g. keydown not keyDown or KeyDown
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousemove", mouseMove);


//Mouse event handlers
function mouseDown(e) {
    //console.log("mouseDown: " + e.clientX + " " + e.clientY)
}
function mouseUp(e) {
    //console.log("mouseUp: " + e.clientX + " " + e.clientY)
}
function mouseMove(e) {
    //console.log("mouseMove: " + e.clientX + " " + e.clientY)
}

//Key up event handlers
function keyUp(e) {
    keysDown[e.key] = false
    
    //Pause functionality
    if (e.key == "p") {
        pause = !pause
    }

}

//Key down event handlers.
//Remember that key down can be triggered
//Multiple times without a keyup event 
//If the user hold the key down ("repated keys")
function keyDown(e) {
    keysDown[e.key] = true
    
    //To prevent scrolling (if needed)
    //This has to be in keyDown, not keyup
    if (e.key == " ") {
        e.preventDefault()
    }
}

//-----------------------------------------------------------
//Game Loop
//-----------------------------------------------------------

//Update the engine
function engineUpdate() {
    //Handle the case when there is a system level pause.
    if (pause) return

    //Get a reference to the active scene.
    let scene = SceneManager.getActiveScene()
    if (SceneManager.changedSceneFlag && scene.start) {
        scene.gameObjects = []
        scene.start()
        SceneManager.changedSceneFlag = false
    }

    //Start any game objects that can be started
    //but have not.
    for (let gameObject of scene.gameObjects) {
        if (gameObject.start && !gameObject.started) {
            gameObject.start()
            gameObject.started = true
        }
    }

    //Start any components that can be started
    //but have not.
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.start && !component.started) {
                component.start()
                component.started = true
            }
        }
    }

    //Handle destroy here

    //Call update on all components with an update function
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.update) {
                component.update()
            }
        }
    }



}

//Draw all the objects in the scene
function engineDraw() {

    //Match the size of the canvas to the browser's size
    //This allows us to respond to browser size changes
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let scene = SceneManager.getActiveScene()

    //Loop through the components and draw them.
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.draw) {
                component.draw(ctx)
            }
        }
    }
}

/**
 * Start the game and set the browser tabe title
 * @param {string} title The title of teh browser window
 */
function start(title) {
    document.title = title
    function gameLoop() {
        engineUpdate()

        engineDraw()

    }

    //Run the game loop 25 times a second
    setInterval(gameLoop, 1000 / 25)

}

/**
 * Test the game. 
 * Runs a series of test on the game.
 * @param {string} title The title of the game. See start(title) for more details
 * @param {object} options The options object.
 * 
 * The options are as follows:
 * maxFrames: The number of frames to run in the test.
 * Note that teh default is 100 frames if maxFrames is not defined.
 */
function test(title, options = {}) {
    //Surround with a try so that if there is an error,
    //We can display it in the browser
    try {
        //Set the title
        document.title = title;

        //Set maxFrames to either the parameter passed in
        //or the default value otherwise.
        let maxFrames = options.maxFrames ? options.maxFrames : 100;
        
        //Emulate the game loop by running for a set number of iterations
        for (let i = 0; i < maxFrames; i++) {
            engineUpdate();
            engineDraw();
        }
        
        //Call the done function if provided
        if (options.done) {
            options.done(ctx);
        }
    } catch (exception) {
        //Update the browser window to show that there is an error.
        failTest()

        //Rethrow the exception so the user can know what line the error
        //is on, etc.
        throw exception;
    }
}

//Called when tests fail.
function failTest() {
    //Draw a red x if a test failed.
    ctx.font = "20px Courier"
    ctx.fillText("❌", 9, 20)
    console.log("An exception was thrown")
}

//Set to truthy if we want to see the name of each test that was passed
//If false, only the final result (passed or failed) is displayed
//without poluting the console.
let verboseDebug = true;

//Called when a test is passed
function passTest(description) {
    //Output the result to the console 
    //if verbose debugging is on.
    if (verboseDebug) {
        console.log("Passed test: " + description)
    }
}

//Called when all tests are passed.
//Draw a green checkmark in the browser
//if all tests were passed
function passTests() {
    ctx.font = "20px Courier"
    ctx.fillText("✅", 9, 20)
    console.log("Called passTests")
}

/**
 * Simple unit test function.
 * If the first parameter evaluates to true, 
 * the test passes.
 * Otherwise, the test fails.
 * @param {boolean} boolean 
 * @param {string} description 
 */
function assert(boolean, description = "") {
    //Handle the failed test case
    if (!boolean) {
        failTest(description)
    }
    //Handle the passed test case
    else {
        if (description)
            passTest(description)
    }
}

//Add certain functions to the global namespace
//This allows us to call these functions without
//a prefix, which better matches Unity

/** Start the game in 'play mode1 */
window.start = start;

/** Start the test.*/
window.test = test;

/** A reference to our unit test function */
window.assert = assert;

/** A reference to the pass tests function. 
 * Called by test code when all tests have passed 
 * */
window.passTests = passTests

/** The state of the keyboard.. */
window.keysDown = keysDown;
