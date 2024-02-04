import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  resultData: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    console.log("*************hello******************");

    const emailCookie = this.cookieService.get('email');
    const tokenCookie = this.cookieService.get('token');

    if (emailCookie && tokenCookie) {
      let bodyData = {
        email: emailCookie,
        token: tokenCookie,
      };

      this.http.post("http://localhost:3000/client/getbytoken", bodyData).subscribe((resultData: any) => {
        console.log("****azo eee****");
        this.resultData=resultData;
      });
    } else {
      // Les cookies n'existent pas, effectuez une autre action si nécessaire
      console.log("Les cookies 'email' et 'token' n'existent pas.");
    }
  }
  deconnection()
  {
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    location.reload();
  }
}

