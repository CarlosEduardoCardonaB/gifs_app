import { Component, Input, OnInit } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit {

  @Input()
  public gif!: Gifs;
  // @Input()
  // public image: string = '';
  // @Input()
  // public title: string = '';

  ngOnInit(){
    if (!this.gif) throw new Error ('Gif property is required');
  }

}
