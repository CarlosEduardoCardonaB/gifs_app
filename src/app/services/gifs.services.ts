import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../gifs/interfaces/gifs.interfaces';




@Injectable({ providedIn: 'root' })
export class GifsService {
  //El {providedIn: 'root'} nos sirve para que este servicio este disponible desde todos los componentes de angular sin necesidad de exportarlo
  public gifList: Gifs[] = [];
  private _tagsHistory1: string[] = [];
  private apiKey:     string = "xEMH5UFOnXxK6F5gv728qob0D6C3D7DG";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs services ready');

   }

  get tagsHistory() {
    return [...this._tagsHistory1];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if( this.tagsHistory.includes(tag)) {
      this._tagsHistory1 = this._tagsHistory1.filter( (oldTag) => oldTag !== tag); //En esta funcion me construye el nuevo arreglo solo con los elementeos que sean diferentes, si hay uno repetido lo retira
    }
    this._tagsHistory1.unshift( tag );
    this._tagsHistory1 = this._tagsHistory1.splice(0, 10);
    this.saveLocalStorage();

  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory1 = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory1.length === 0) return;
    this.searchTag( this._tagsHistory1[0]);

  }

  searchTag ( tag: string ) :void{
    if( tag.length === 0 ) return;
      //console.log(this.tagsHistory);
      this.organizeHistory(tag);

      //Así se haría con la opción fetch nativa de javascript
      // fetch('https://api.giphy.com/v1/gifs/search?api_key=xEMH5UFOnXxK6F5gv728qob0D6C3D7DG&q=valorant&limit=10')
      //   .then( resp => resp.json() )
      //   .then( data => console.log(data));

      //y asi se hace con el httpClient de Angular. Este lo importamos de manera global en el app.module.ts como provideHttpClient()
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('q', tag)
        .set('limit', '10')


      //cuando le decimos que el tipo de dato que retorna el servicio es de tipo <SearchResponse>, indicamos que estamos esperando un response con una interfaz colocada en gifs.interfaces.ts
      //para generar estas interfaces la podemos hacer con el response de la api de postman y colocandola en la plataforma https://app.quicktype.io/, o en visual code con la extensión "Paste JSON as Code"
      this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
        .subscribe( resp=> {
          this.gifList = resp.data;
          console.log(this.gifList);
        });

  }



}
