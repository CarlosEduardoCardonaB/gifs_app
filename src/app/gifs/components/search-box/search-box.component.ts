import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../services/gifs.services';

@Component({
  selector: 'gifs-search-box',
  template: `<h5>Buscar:</h5>
  <input
    type="text"
    class="form-control"
    placeholder="Buscar gifs"
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor( private gifsService: GifsService ) { }

  //Esta forma de trabajar se haría con el keyup de Html que sería este "(keyup.enter)="searchTag( txtTagInput.value )"
  // searchTag( newTag: string ){
  //   console.log(newTag)
  // }

  //En este ejemplo vamos a trabajar con el VIewChild y no necesitamos argumentos de entrada como el anterior ejemplo
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
    //console.log(newTag)
  }
}


