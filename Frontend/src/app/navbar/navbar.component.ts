import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private myrouter:Router){}
  @ViewChild('myTag') myTag: any;
  isselected=false;
  user:any;
  username:any;
  ngOnInit(){
    if(localStorage.getItem('logeduser')==null)
      this.myrouter.navigateByUrl("");
    else{
      this.user = localStorage.getItem("logeduser");
      this.user = JSON.parse(this.user);
      this.username = this.user.username;
    }
  }
  togglebar(){
    if (this.myTag.nativeElement.id) {
      this.isselected = !this.isselected;
    }
  }
  logout(){
    localStorage.removeItem("logeduser");
    this.myrouter.navigateByUrl('');
  }
}
