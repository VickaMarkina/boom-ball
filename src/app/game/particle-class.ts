export class Particle {
  x!: number;
  y!: number; 
  radius!: number;
  color!: string;
  context!: CanvasRenderingContext2D;
  velocity!: {x:number, y:number};
  alpha: number = 1;
  friction: number = 0.98

  constructor(x: number, y: number, radius: number,
     color: string, context: CanvasRenderingContext2D, velocity:{x:number, y:number}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.context = context
    this.velocity = velocity
  }
  
  draw(){
    this.context.save();
    this.context.globalAlpha = this.alpha;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.restore();
  }

  update(){
    this.draw();
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.01
  }
}