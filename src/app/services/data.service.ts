import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isLoading = new Subject<boolean>();
  message = new Subject<string>();

  constructor() { }
}
