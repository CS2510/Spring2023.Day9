import "/engine/engine.js"

//-----------------------------------------------------
//Start

class StartController extends Component {
    start() {
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        this.freezeTime += 25 / 1000
        if (keysDown["a"] && this.freezeTime >= this.maxFreezeTime) {
            SceneManager.changeScene(1)
        }
    }
}

class StartDrawComponent extends Component {
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "40px Courier"
        ctx.fillText("Welcome to Pong", 100, 100);
    }
}

class StartControllerGameObject extends GameObject {
    start() {
        this.addComponent(new StartController())
    }

}

class StartDrawGameObject extends GameObject {
    start() {
        this.addComponent(new StartDrawComponent());
    }

}

class StartScene extends Scene {
    start() {
        this.addGameObject(new StartControllerGameObject())
        this.addGameObject(new StartDrawGameObject())
    }
}

//-----------------------------------------------------
//Main

class MainController extends Component{
    start(){
        //Create a new pong ball
        let ballGameObject = new GameObject("BallGameObject")
        let ballComponent = new BallComponent();
        ballComponent.addListener(this)
        ballGameObject.addComponent(ballComponent)

        let circle = new Circle()
        ballGameObject.addComponent(circle)
        circle.fillStyle = "yellow"
        circle.transform.sx = 5
        GameObject.instantiate(ballGameObject)

        //Create a second pong ball
        ballGameObject = new GameObject("BallGameObject")
        ballComponent = new BallComponent();
        ballComponent.addListener(this)
        ballGameObject.addComponent(ballComponent)

        circle = new Circle()
        ballGameObject.addComponent(circle)
        circle.fillStyle = "blue"
        circle.transform.sx = 5
        circle.transform.x = -25
        GameObject.instantiate(ballGameObject)
    }
    handleUpdate(component, eventName){
        console.log(eventName);
        //Check to see if there are any more pong balls in play
        let ballGameObjects = GameObject.getObjectsByName("BallGameObject")
        let countLive = 0;
        for(let ballGameObject of ballGameObjects){
            if(!ballGameObject.markedForDestroy){
                countLive++;
            }
        }
        console.log("I found " + countLive + " remaining pong balls")
    }
}

class PointsComponent extends Component {
    name = "PointsComponent"
    start() {
        this.points = 0
    }
    update() {

    }
    draw(ctx) {

        //View part of MVC
        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.fillStyle = "white"
        ctx.fillText(this.points, this.transform.x, this.transform.y);
    }
}
class BallComponent extends Component {
    name = "BallComponent"
    start() {
        this.margin = 20;
        this.size = 100;
        this.transform.x = this.margin + this.size / 2 + this.transform.x
        this.transform.y = this.margin + this.size / 2
        this.pongVX = 3
        this.pongVY = -2
    }
    update() {

        let paddleGameObject = GameObject.getObjectByName("PaddleGameObject")
        let paddleComponent = paddleGameObject.getComponent("PaddleComponent")
        let paddleWidth = paddleComponent.paddleWidth;
        let paddleX = paddleComponent.transform.x;

        let pointsGameObject = GameObject.getObjectByName("PointsGameObject");
        let pointsComponent = pointsGameObject.getComponent("PointsComponent");



        //Model of MVC
        this.transform.x += this.pongVX
        this.transform.y += this.pongVY

        if (this.transform.x > this.margin + this.size) {
            this.pongVX *= -1
        }
        if (this.transform.y > this.margin + this.size) {
            //Check for a collision with the paddle
            if (paddleX - paddleWidth / 2 <= this.transform.x && paddleX + paddleWidth / 2 >= this.transform.x) {
                this.pongVY *= -1
                pointsComponent.points++
            }
            else {
                this.updateListeners("BallOutOfBounds")
                this.parent.destroy()
            }
        }
        if (this.transform.x < this.margin) {
            this.pongVX *= -1
        }
        if (this.transform.y < this.margin) {
            this.pongVY *= -1
        }
    }
}

class PaddleComponent extends Component {
    name = "PaddleComponent"
    start() {
        this.margin = 20;
        this.size = 100;
        this.transform.x = this.margin + this.size / 2
        this.paddleWidth = 40;
    }
    update() {


        //Update the paddle based on input
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= 2;
        }
        else if (keysDown["ArrowRight"]) {
            this.transform.x += 2
        }

        //Constrain the paddle position
        if (this.transform.x < this.margin + this.paddleWidth / 2) {
            this.transform.x = this.paddleWidth / 2 + this.margin
        }
        if (this.transform.x > this.margin - this.paddleWidth / 2 + this.size) {
            this.transform.x = -this.paddleWidth / 2 + this.margin + this.size
        }
    }
    draw(ctx) {


        //Now draw the paddle
        ctx.beginPath()
        ctx.moveTo(this.transform.x - this.paddleWidth / 2, this.margin + this.size)
        ctx.lineTo(this.transform.x + this.paddleWidth / 2, this.margin + this.size)
        ctx.stroke()

    }
}

class WallsComponent extends Component {
    name = "WallsComponent"
    start() {
        this.margin = 20;
        this.size = 100;
    }
    draw(ctx) {

        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.moveTo(this.margin, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin + this.size)
        ctx.moveTo(this.margin, this.margin + this.size)
        ctx.lineTo(this.margin, this.margin)
        ctx.stroke()
    }
}

class MainScene extends Scene {
    start() {
        let pointsGameObject = new GameObject("PointsGameObject")
        pointsGameObject.addComponent(new PointsComponent())
        pointsGameObject.transform.x = 0
        pointsGameObject.transform.y = 10
        this.addGameObject(pointsGameObject)


        // let ballGameObject = new GameObject("BallGameObject")
        // ballGameObject.addComponent(new BallComponent())

        // let circle = new Circle()
        // ballGameObject.addComponent(circle)
        // circle.fillStyle = "yellow"
        // circle.transform.sx = 5
        // this.addGameObject(ballGameObject)

        // ballGameObject = new GameObject("BallGameObject")
        // ballGameObject.addComponent(new BallComponent())

        // circle = new Circle()
        // ballGameObject.addComponent(circle)
        // circle.fillStyle = "blue"
        // circle.transform.sx = 5
        // circle.transform.x = -25
        // this.addGameObject(ballGameObject)


        this.addGameObject(new GameObject("PaddleGameObject").addComponent(new PaddleComponent()))
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))
        this.addGameObject(new GameObject("ControllerGameObject").addComponent(new MainController()))
    }
}

//-----------------------------------------------------
//End

class EndController extends Component {
    update() {
        if (keysDown["a"]) {
            SceneManager.changeScene(0)
        }
    }
}

class EndDrawComponent extends Component {
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        ctx.fillText("You died", 100, 100);
    }
}

class EndScene extends Scene {
    start() {
        this.addGameObject(new GameObject().addComponent(new EndController()))
        this.addGameObject(new GameObject().addComponent(new EndDrawComponent()))
    }
}

let startScene = new StartScene()
let mainScene = new MainScene()
let endScene = new EndScene()

window.allScenes = [startScene, mainScene, endScene]
