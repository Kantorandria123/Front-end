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

   emailManager: string ='mihary@gmail.com';
   mdpManager: string ='123';
  

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

   loginManager() {
    console.log(this.emailManager);
    console.log(this.mdpManager);

    let bodyData = {
      email: this.emailManager,
      mdp: this.mdpManager,
    };

    this.http.post("http://localhost:3000/manager/login", bodyData).subscribe( (resultData: any) => {
      console.log(resultData);

      if (resultData.status) {
        this.cookieService.set('email',resultData.managers.email);
         this.cookieService.set('token', resultData.managers.token);
         this.cookieService.set('id', resultData.managers._id);
         this.router.navigateByUrl('/pesonnel')
      } else {
        this.errorMessage="Email ou Mot de passe incorrecte";
         console.log("Error login");
      }
    });
 }
 
}



