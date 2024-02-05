import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = 'john.doe@example.com';
  mdp: string = '123';

  isLogin: boolean = true;
  erroMessage: string = "";
  showPassword: boolean = false;
  constructor(private router: Router,private http: HttpClient, private cookieService: CookieService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log(this.email);
    console.log(this.mdp);

    let bodyData = {
      email: this.email,
      mdp: this.mdp,
    };

        this.http.post("http://localhost:3000/client/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);

        if (resultData.status)
        {
          this.cookieService.set('email', resultData.client.email);
          this.cookieService.set('token', resultData.client.token);
          this.cookieService.set('id', resultData.client._id);
           this.router.navigateByUrl('/');
        }
        else
         {
          //alert("Incorrect Email or Password");
          this.erroMessage="Incorrecte Email ou mot de passe";
          console.log("Errror login");
        }
      });
    }
}
