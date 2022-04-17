
import { Component, OnInit, } from '@angular/core';
import {gsap} from 'gsap';
import { Enemy } from './enemy-class';
import { Particle } from './particle-class';
import { Player } from './player-class';
import { Projectile } from './projectile-class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  player!: Player;
  projectiles: Projectile[] = [];
  particles: Particle[] = [];
  enemies: Enemy[] = [];

  x!: number;
  y!: number;

  animationId! : any;
  score: number = 0;

  scoreEl!: HTMLElement;
  
  constructor() { 
  }
  
  ngOnInit(): void { 
    let canvas = document.querySelector('canvas') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.canvas = canvas;
    this.context = context;

    this.createPlayer();
    this.createProjectiles();
    this.animate();
    this.spawnEnemies();
  }

  createPlayer() {
    this.player = new Player(
    this.x, this.y, 10, 'white', this.context);
  }

  spawnEnemies(){
    setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4;
      let x
      let y

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : this.canvas.width + radius;
        y = Math.random() * this.canvas.height;        
      } else {
        y = Math.random() < 0.5 ? 0 - radius : this.canvas.height + radius;
        x = Math.random() * this.canvas.width;
      }

      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      const angle = Math.atan2(
        this.y - y,
        this.x - x
      )
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }
    
      this.enemies.push(new Enemy(x, y, radius, color, this.context, velocity))
    }, 1000)
  }

  animate() {   
    this.animationId = requestAnimationFrame(() => this.animate())
    this.context.fillStyle = 'rgba(0, 0, 0, 0.2)'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach((particle, index) => {
      if(particle.alpha <= 0) {
        this.particles.splice(index, 1)
      } else{
      particle.update()}
    })
    this.player.draw()

    this.projectiles.forEach((projectile, index) => {
      projectile.update()

      if(projectile.x + projectile.radius < 0 ||
         projectile.x - projectile.radius > this.canvas.width ||
         projectile.y + projectile.radius < 0 ||
         projectile.y - projectile.radius > this.canvas.height){
        setTimeout(() => {
          this.projectiles.splice(index, 1)
        }, 0)
      }
    })

    this.enemies.forEach((enemy, index) => { 
      enemy.update()
      const dist =  Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y)

      if(dist - enemy.radius - this.player.radius < 1){
        cancelAnimationFrame(this.animationId)
      }

      this.projectiles.forEach((projectile, projectileIndex) => {
       const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

       if(dist - enemy.radius - projectile.radius < 1) {
        for (let i = 0; i < enemy.radius * 2; i++) {
         this.particles.push(new Particle(
           projectile.x,
           projectile.y,
           Math.random() * 2, 
           enemy.color, 
           this.context, 
           {x: (Math.random() - 0.5) * (Math.random() * 6) , 
            y:( Math.random() - 0.5) * (Math.random() * 6)} ))
        }

        if(enemy.radius - 10 > 5){
          this.score += 50;

          gsap.to(enemy, {
            radius: enemy.radius - 10
          })
          setTimeout(() => {
            this.projectiles.splice(projectileIndex, 1)
          }, 0)
        } else {
          this.score += 150;
           
         setTimeout(() => {
           this.enemies.splice(index, 1)
           this.projectiles.splice(projectileIndex, 1)
         }, 0)}
       }
      })
    })
  }

  createProjectiles() {
    addEventListener('click', (e) => {
      const angle = Math.atan2(
        e.clientY - this.y,
        e.clientX - this.x
      )
      const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
      }

      this.projectiles.push(new Projectile(this.x, this.y, 5, 'white', this.context, velocity))
    })
  }
  
}
