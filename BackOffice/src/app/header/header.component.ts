import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  resultData: any;
  useradmin:number=0;
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

   ngOnInit() {
     const idcookie = this.cookieService.get('id_admin');
     const emailCookie = this.cookieService.get('email_admin');
     const tokenCookie = this.cookieService.get('token_admin');
      const admin = localStorage.getItem('useradmin');
      if (admin) {
        this.useradmin = +admin;
      }
     if (idcookie && emailCookie && tokenCookie) {
       let bodyData = {
         email: emailCookie,
         token: tokenCookie,
       };
       if(this.useradmin==1)
       {
          this.http.post(environment.baseUrl+"/employe/employebytoken", bodyData).subscribe ( (resultData: any) => {
          this.resultData=resultData;
         });
       }
       if(this.useradmin==2)
       {
          this.http.post(environment.baseUrl+"/manager/managertoken", bodyData).subscribe ( (resultData: any) => {
          this.resultData=resultData;
         });
       }

     } else {
       console.log("Les cookies 'email' et 'token' n'existent pas.");
     }
}
deconnection()
{
  this.cookieService.delete('id_admin');
  this.cookieService.delete('email_admin');
  this.cookieService.delete('token_admin');
  localStorage.removeItem("useradmin");
  this.router.navigateByUrl('/')
}
}
