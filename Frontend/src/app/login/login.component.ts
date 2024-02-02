import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpressdbService } from '../services/expressdb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private myrouter:Router, private db:ExpressdbService){}
  user : any;
  userinfo : any;
  username : any = "";
  password : any = "";
  welcome:any;

  onLogin(){
    this.user = {
      "username":this.username,
      "password":this.password
    }
    console.log("ts"+this.user.username);
    this.db.login(this.user).subscribe((res)=>{

      console.log("User Info:", JSON.stringify(res));
      this.userinfo=res;

      if(this.userinfo=='User not found' || this.userinfo=='Authentication failed'){
        alert(this.userinfo);
      }
      else{
        this.myrouter.navigateByUrl("/navbar/dashboard");
        this.user = {
          "username":this.userinfo.username,
          "password":this.userinfo.password
        }
        localStorage.setItem("logeduser",JSON.stringify(this.user));
        // console.log(this.userinfo);
        // console.table(this.userinfo);
      }
    });
    
  }
}
