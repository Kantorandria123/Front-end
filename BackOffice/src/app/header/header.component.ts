import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  resultData: any;
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

   ngOnInit() {
     console.log("*************hello******************");

     const idcookie = this.cookieService.get('id');
     const emailCookie = this.cookieService.get('email');
     const tokenCookie = this.cookieService.get('token');

     if (idcookie && emailCookie && tokenCookie) {
       let bodyData = {
         email: emailCookie,
         token: tokenCookie,
       };
       console.log(bodyData);

       this.http.post("http://localhost:3000/employe/employebytoken", bodyData).subscribe ( (resultData: any) => {
        this.resultData=resultData;
        console.log(resultData);
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
  location.reload();
}
}
