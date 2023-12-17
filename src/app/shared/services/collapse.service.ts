import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapseService {
  openSiderbar: boolean = false ;
  constructor() { }
}
