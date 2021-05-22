import { HttpClient } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';
import { Observable } from 'rxjs';
import { Celular } from '../model/Celular.model';

@Injectable({
  providedIn: 'root'
})
export class CelularService {

  constructor( private http: HttpClient) {  }

  getCelulares(): Observable<[Celular]>{
    return this.http.get<[Celular]>("https://super-rest.herokuapp.com/test/celulares");
  }

  getSingleCelular(id: string): Observable<Celular>{
    return this.http.get<Celular>("https://super-rest.herokuapp.com/test/celulares/" + id);
  }

  saveCelular(item: Celular, id?: string): Observable<any>{
    //update
    if(id !== ""){
      return this.http.put("https://super-rest.herokuapp.com/test/celulares/"+ id,item);
    }
    return this.http.post("https://super-rest.herokuapp.com/test/celulares",item);

  }

  deleteCelular(id: string): Observable<any>{
    return this.http.delete("https://super-rest.herokuapp.com/test/celulares/"+ id)
  }
}
