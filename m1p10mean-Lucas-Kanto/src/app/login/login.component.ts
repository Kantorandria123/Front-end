import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = 'kuchylucky@gmail.com';
  mdp: string = '123';

  isLogin: boolean = true;
  erroMessage: string = "";
  showPassword: boolean = false;
  constructor(private router: Router,private http: HttpClient, private cookieService: CookieService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    let bodyData = {
      email: this.email,
      mdp: this.mdp,
    };

        this.http.post(environment.baseUrl+"/client/login", bodyData).subscribe(  (resultData: any) => {

        if (resultData.status)
        {
          this.cookieService.set('email', resultData.client.email);
          this.cookieService.set('token', resultData.client.token);
          this.cookieService.set('id', resultData.client._id);
           this.router.navigateByUrl('/');
        }
        else
         {
          this.erroMessage="Incorrecte Email ou mot de passe";
        }
      });
    }
}
