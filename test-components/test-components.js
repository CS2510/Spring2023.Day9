//The code for our example game
class ExampleComponent extends Component {
  start() {
    this.transform.x = 100;
    this.transform.y = 100;
    this.transform.sx = 50;
    this.transform.sy = 25;
    let component = this.parent.getComponent("Rectangle");
    component.fillStyle = "black"
  }
  update() {
  }
  
}

class ExampleScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("ExampleGameObject")
      .addComponent(new Rectangle())
      .addComponent(new ExampleComponent())
    )
  }
}

//export the main scene so the .html file can run the game.
export default new ExampleScene();