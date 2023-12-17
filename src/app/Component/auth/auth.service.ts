import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

// message :string = '';
 private currentUser : BehaviorSubject<any> =new BehaviorSubject<any> (null);
 private isloggedIn :BehaviorSubject<boolean> =new BehaviorSubject<boolean> (false);


 get currentUser$(){
   return this.currentUser.asObservable();
 }
 get isloggedIn$(){
  return this.isloggedIn.asObservable();
 }

  authLogin(res : any){
  
    localStorage.setItem('userDetails' , JSON.stringify(res));
    this.router.navigate(['dashboard/default']);
    this.currentUser.next(res);
    this.isloggedIn.next(true);

  }
  logout(){
    this.currentUser.next(null);
    this.isloggedIn.next(false);
  }
}
