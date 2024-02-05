import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private db: ExpressdbService, private myrouter: Router) { }
  user: any;
  username: any;
  email: any;
  password: any;
  confirmPassword: any;
  registernow() {
    if (this.password === this.confirmPassword) {
      this.user = {
        "username": this.username,
        "email": this.email,
        "password": this.password
      };

      this.db.signup(this.user).subscribe(
        (res: any) => {
          alert(res.message); // Display the message property from the response
          localStorage.setItem("loginuser", JSON.stringify(this.user));
          // Redirect or perform other actions on successful registration
          this.myrouter.navigateByUrl("/navbar/dashboard");
        },
        (error) => {
          console.error(error);
          if (error.error && error.error.error) {
            alert(error.error.error); // Display the error message from the response
          } else {
            alert("Error occurred while signing up."); // Display a generic error message
          }
        }
      );
    }
  }
}