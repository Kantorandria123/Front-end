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
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

   ngOnInit() {
     const idcookie = this.cookieService.get('id');
     const emailCookie = this.cookieService.get('email');
     const tokenCookie = this.cookieService.get('token');

     if (idcookie && emailCookie && tokenCookie) {
       let bodyData = {
         email: emailCookie,
         token: tokenCookie,
       };
       this.http.post(environment.baseUrl+"/employe/employebytoken", bodyData).subscribe ( (resultData: any) => {
        this.resultData=resultData;
       });
     } else {
       console.log("Les cookies 'email' et 'token' n'existent pas.");
     }
}
deconnection()
{
  this.cookieService.delete('id');
  this.cookieService.delete('email');
  this.cookieService.delete('token');
  this.router.navigateByUrl('/')
}
}
