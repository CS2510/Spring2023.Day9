/**
 * A circle engine-level component
 */
class Rectangle extends Component {
  /** The name of the component */
  name = "Rectangle"

  /** The fill color of the component */
  fillStyle = "white"

  /**
   * Draw the rectangle to the given context.
   * @param {2DContext} ctx The context to draw to.
   */
  draw(ctx) {
    //Set the fill style
    ctx.fillStyle = this.fillStyle

    // Draw the circle
    ctx.beginPath()
    ctx.rect(-this.transform.sx/2 + this.transform.x, -this.transform.sy/2 + this.transform.y,this.transform.sx, this.transform.sy);
    ctx.fill()
  }
}

//Add rectangle to the global namespace.
window.Rectangle = Rectangle;