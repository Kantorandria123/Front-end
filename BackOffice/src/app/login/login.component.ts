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


   email: string = 'sarah@gmail.com';
   mdp: string = '123';
   errorMessage: string = "";

   emailManager: string ='mihary@gmail.com';
   mdpManager: string ='123';

   user: number=0;


  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}


   loginEmployee() {
     let bodyData = {
       email: this. email,
       mdp: this.mdp,
     };

     this.http.post(environment.baseUrl+"/employe/login", bodyData).subscribe ( (resultData: any) => {
       if (resultData.status) {
         this.cookieService.set('email_admin',resultData.employes.email);
         this.cookieService.set('token_admin', resultData.employes.token);
         this.cookieService.set('id_admin', resultData.employes._id);
         localStorage.setItem('useradmin', '1');
         this.router.navigateByUrl('/home')
       } else {
         this.errorMessage="Email ou Mot de passe incorrecte";
       }
     });
   }

   loginManager() {
    let bodyData = {
      email: this.emailManager,
      mdp: this.mdpManager,
    };

    this.http.post(environment.baseUrl+"/manager/login", bodyData).subscribe( (resultData: any) => {
      if (resultData.status) {
        this.cookieService.set('email_admin',resultData.managers.email);
         this.cookieService.set('token_admin', resultData.managers.token);
         this.cookieService.set('id_admin', resultData.managers._id);
         localStorage.setItem('useradmin', '2');
         this.router.navigateByUrl('/personnel')
      } else {
        this.errorMessage="Email ou Mot de passe incorrecte";
      }
    });
 }

}



