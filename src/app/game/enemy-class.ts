export class Enemy {
  x!: number;
  y!: number; 
  radius!: number;
  color!: string;
  context!: CanvasRenderingContext2D;
  velocity!: {x:number, y:number};

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
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
  }

  update(){
    this.draw();
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}