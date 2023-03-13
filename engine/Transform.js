/**
 * The transform component.
 * This stores the position of the game object in 2D (x,y),
 * the scale of the game object (sx,sy),
 * and the rotation of the component, r).
 * 
 * All game objects have a transform. If more than one transform 
 * are attached to a game object, only the one and index 0 will
 * be used. It is best practice not to have multiple Transform instances
 * on a game objects.
 */
class Transform extends Component{
  /** The name of the component. Defaults to "Transform" */
  name = "Transform"

  /** The x position of the transform. Defaults to 0. */
  x = 0

  /** The y position of the transform. Defaults to 0. */
  y = 0

  /** The scale in the x axis. Defaults to 1 */
  sx = 1

  /** The scale in the y axis. Defaults to 1. */
  sy = 1

  /** The rotation. Defaults to 0 */
  r = 0

  /**
   * Designed primarily for lines, the factory function 
   * Determins the x, y, scale, and rotation given a from and to point.
   * 
   * @param {Number} startX The start location x for the new transform.
   * @param {Number} startY The start location y for the new transform.
   * @param {Number} endX The end location x for the new transform.
   * @param {Number} endY The end location y for the new transform.
   */
  static fromTo(startX, startY, endX, endY){
    let t = new Transform();
    t.x = (startX + endX)/2
    t.y = (startY + endY)/2
    let length = Math.sqrt((startX - endX)**2+(startY - endY)**2)
    t.sx = length/2
    t.sy = 1
    t.r = Math.atan2((endY - startY), (endX - startX));

    return t;
  }

  static test(){
    //Do tests on the transform object
    testSection("Transform Object")
    let transform = new Transform();
    assert(transform.x == 0, "Default transform.x is 0")
    assert(transform.y == 0, "Default transform.y is 0")
    assert(transform.sx == 1, "Default transform.sx is 1")
    assert(transform.sy == 1, "Default transform.sy is 1")
    assert(transform.r == 0, "Default transform.r is 0")

    testSection("Transform fromTo")
    let t = Transform.fromTo(0, 0, 1,0)
    assert(t.x == .5, "fromTo generates the right x value")
    assert(t.y == 0, "fromTo generates the right y value")
    assert(t.sx == .5, "fromTo generates the right sx value")
    assert(t.sy == 1, "fromTo generates the right sy value")
    assert(t.r == 0, "fromTo generates the right r value")

    testSection("Transform fromTo")
    t = Transform.fromTo(0, 0, 1,0)
    assert(t.x == .5, "fromTo generates the right x value")
    assert(t.y == 0, "fromTo generates the right y value")
    assert(t.sx == .5, "fromTo generates the right sx value")
    assert(t.sy == 1, "fromTo generates the right sy value")
    assert(t.r == 0, "fromTo generates the right r value")
  }
}

window.Transform = Transform;