class ExampleScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("ExampleRectangle")
      .addComponent(new Rectangle("black")),
      new Vector2(100,100),
      new Vector2(50,25)
    )
    this.addGameObject(
      new GameObject("ExampleCircle")
      .addComponent(new Circle("black")),
      new Vector2(300,300),
      new Vector2(50,25)
    )
  }
}

//export the main scene so the .html file can run the game.
export default new ExampleScene();