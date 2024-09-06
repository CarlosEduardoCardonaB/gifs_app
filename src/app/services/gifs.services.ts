import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  //El {providedIn: 'root'} nos sirve para que este servicio este disponible desde todos los componentes de angular sin necesidad de exportarlo

  private _tagsHistory1: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory1];
  }

  searchTag ( tag: string ): void{
    this._tagsHistory1.unshift( tag );

    console.log(this.tagsHistory);
  }

}
