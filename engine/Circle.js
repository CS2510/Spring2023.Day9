class Circle extends Component{
  name = "Circle"
  fillStyle = "white"
  draw(ctx) {
      ctx.fillStyle = this.fillStyle

      ctx.beginPath()
      ctx.arc(this.transform.x, this.transform.y, this.transform.sx, 0, Math.PI * 2)
      ctx.fill()
  }
}

window.Circle = Circle;