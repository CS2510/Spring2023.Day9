/**
 * The scene class.
 * 
 * Scenes are containers for game objects.
 * See https://docs.unity3d.com/Manual/CreatingScenes.html
 */
class Scene {
  /** List of game objects in the scene */
  gameObjects = []

  /**
   * Add a game object to a scene.
   * Eventually we will switch to using Instantiate
   * See https://docs.unity3d.com/ScriptReference/Object.Instantiate.html
   * 
   * @param {GameObject} gameObject The game object to add
   * @param {Vector2} translate The initial translation value. If no value is provided, the tranlation is (0,0)
   * @param {Vector2} scale The initial scale value. If no value is given, the scale is (1,1)
   * @param {Number} rotation The initial rotation value. If no value is given, the rotation is 0
   */
  addGameObject(gameObject, translate = Vector2.zero, scale = Vector2.one, rotation = 0){
      this.gameObjects.push(gameObject);
      gameObject.transform.x = translate.x;
      gameObject.transform.y = translate.y;
      gameObject.transform.sx = scale.x;
      gameObject.transform.sy = scale.y;
      gameObject.transform.r = rotation;

      if(gameObject.start && !gameObject.started){
          gameObject.started = true
          gameObject.start()
      }
  }
}

window.Scene = Scene;