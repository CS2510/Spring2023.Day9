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
   */
  addGameObject(gameObject){
      this.gameObjects.push(gameObject);
      if(gameObject.start && !gameObject.started){
          gameObject.started = true
          gameObject.start()
      }
  }
}

window.Scene = Scene;