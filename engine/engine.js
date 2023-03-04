import "./SceneManager.js"
import "./Component.js"
import "./Scene.js"
import "./GameObject.js"
import "./Transform.js"
import "./Circle.js"

let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d");

let keysDown = []
let mouseX;
let mouseY

//Not the strings has to be all lowercase, e.g. keydown not keyDown or KeyDown
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousemove", mouseMove);

//0 is start scene, 1 main scene, 2 is dead scene
let scene = 0;

let pause = false

function mouseDown(e) {
    //console.log("mouseDown: " + e.clientX + " " + e.clientY)
}
function mouseUp(e) {
    //console.log("mouseUp: " + e.clientX + " " + e.clientY)
}
function mouseMove(e) {
    //console.log("mouseMove: " + e.clientX + " " + e.clientY)
}

function keyUp(e) {
    keysDown[e.key] = false
    //console.log(e)
    if (e.key == "ArrowLeft") {
        console.log("Up Left")
    }
    if (e.key == "ArrowRight") {
        console.log("Up Right")
    }
    if (e.key == "p") {
        pause = !pause
    }

}

function keyDown(e) {
    keysDown[e.key] = true
    //console.log(e)
    if (e.key == "ArrowLeft") {
        console.log("Down Left")
    }
    if (e.key == "ArrowRight") {
        console.log("Down Right")
    }
    //To prevent scrolling (if needed)
    //This has to be in keyDown, not keyup
    if (e.key == " ") {
        e.preventDefault()
    }
}

function engineUpdate() {
    if (pause) return
    let scene = SceneManager.getActiveScene()
    if (SceneManager.changedSceneFlag && scene.start) {
        scene.gameObjects = []
        scene.start()
        SceneManager.changedSceneFlag = false
    }

    for (let gameObject of scene.gameObjects) {
        if (gameObject.start && !gameObject.started) {
            gameObject.start()
            gameObject.started = true
        }
    }

    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.start && !component.started) {
                component.start()
                component.started = true
            }
        }
    }

    //Handle destroy here

    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.update) {
                component.update()
            }
        }
    }



}

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let scene = SceneManager.getActiveScene()

    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.draw) {
                component.draw(ctx)
            }
        }
    }
}

function start(title) {
    document.title = title
    function gameLoop() {
        engineUpdate()

        engineDraw()

    }

    setInterval(gameLoop, 1000 / 25)

}

function test(title, options = {}) {
    try {
        document.title = title;
        let maxFrames = options.maxFrames ? options.maxFrames : 100;
        console.log("Beginning test");
        for (let i = 0; i < maxFrames; i++) {
            engineUpdate();
            engineDraw();
        }
        console.log("Ending test");
        if (options.done) {
            options.done(ctx);
        }
    } catch (exception) {
        failTest()
        throw exception;
    }
}

function failTest() {
    ctx.font = "20px Courier"
    ctx.fillText("❌", 9, 20)
    console.log("An exception was thrown")
}


let verboseDebug = true;

function passTest(description){
    if(verboseDebug){
        console.log("Passed test: " + description)
    }
}

function passTests() {
    ctx.font = "20px Courier"
    ctx.fillText("✅", 9, 20)
    console.log("Called passTests")
}

function assert(boolean, description = "") {
    if (!boolean) {
        failTest(description)
    }
    else {
        if (description)
            passTest(description)
    }
}

window.start = start;
window.test = test;
window.assert = assert;
window.passTests = passTests
window.keysDown = keysDown;
