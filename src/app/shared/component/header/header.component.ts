import { Component } from '@angular/core';
import { Global } from '../../utility/globle';
import { CollapseService } from '../../services/collapse.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
userImage : string = 'assets/images/user.png';
openSiderbar: boolean = false ;

constructor( public _collapseServices : CollapseService ){}

ngOninIt () : void{

  let userDetails = JSON.parse(localStorage.getItem('userDetails'));
  this.userImage= (userDetails.imagePath == ""  || userDetails.imagePath == null) ? 'assets/images/user.png': userDetails.imagePath


}
  collaapeSidebar(){
  this._collapseServices.openSiderbar = ! this._collapseServices.openSiderbar;
  }

}
