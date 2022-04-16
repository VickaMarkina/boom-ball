import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  
  constructor() { 
   let canvas = document.querySelector('.canvas') as HTMLCanvasElement;
   let context = canvas.getContext('2d');

   canvas.width = innerWidth;
   canvas.height = innerHeight;
   
   console.log(canvas)
  }

  ngOnInit(): void {
    
  }

}
