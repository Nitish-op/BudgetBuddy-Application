import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor (private db:ExpressdbService, private myrouter:Router){}
  user : any;
  username : any;
  email : any;
  password : any;
  confirmPassword : any;
  registernow(){
    if(this.password==this.confirmPassword){
      this.user = {
        "username" : this.username,
        "email" : this.email,
        "password" : this.password
      }
      this.db.register(this.user).subscribe((res)=>{alert(res)});
      localStorage.setItem("loginuser",JSON.stringify(this.user));
      this.myrouter.navigateByUrl("/navbar/dashboard");
      // console.log(this.uname,this.pwd)    
      console.log("signup");
    }
  }

}
