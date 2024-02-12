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

 
   email: string = 'sarah@gmail.com';
   mdp: string = '123';
   errorMessage: string = "";
  

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}


   loginEmployee() {

     console.log(this.email);
     console.log(this.mdp);

     let bodyData = {
       email: this. email,
       mdp: this.mdp,
     };

     this.http.post("http://localhost:3000/employe/login", bodyData).subscribe ( (resultData: any) => {
       console.log(resultData);

       if (resultData.status) {
         this.cookieService.set('email',resultData.employes.email);
         this.cookieService.set('token', resultData.employes.token);
         this.cookieService.set('id', resultData.employes._id);
         this.router.navigateByUrl('/home')
       } else {
         this.errorMessage="Email ou Mot de passe incorrecte";
         console.log("Error login");
       }
     });
   }
}
