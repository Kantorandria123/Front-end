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

  nom: string = '';
  email: string = 'sarah@gmail.com';
  mdp: string = '123';
  image: string = '';
  horaireTravail = '';
  role_id: string = '';
  token: string = '';
  strongMessage: string="";
  messageInscrit: string = "";
  isLogin: boolean = true;
  errorMessage: string = "";
  roles: any[]= [];

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    this.getListRole();

  }
  getListRole(){
    const url = 'http://localhost:3000/role/lesroles';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.roles) {
          this.roles = response.roles;
          if (this.roles.length > 0) {
            this.role_id = this.roles[0]._id;
          }
          console.log('Liste rôle :', this.roles);
        } else {
          console.error('Reponse inattendue du serveur :', response);
        }
      }
    );
  }
  
  inscriptionEmployee() {
    console.log("inscription");
    let bodyData = {
      "nom" : this.nom,
      "email" : this.email,
      "mdp" : this.mdp,
      "image" : this.image,
      "horaireTravail" :  this.horaireTravail,
      "role_id" : this.role_id,
      "token": this.token
    };
    console.log("bodyData : " +bodyData);
    this.http.post("http://localhost:3000/employe/create",bodyData).subscribe((resultData: any) => {
      if(resultData.status) {
        this.strongMessage="C'est fait"
        this.messageInscrit="inscription reussi."
      } 
      else {
        this.strongMessage="Attention! "
        this.messageInscrit="Erreur de l'inscription."
      }
    });
  }
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
        this.cookieService.set('email',resultData.employee.email);
        this.cookieService.set('mdp', resultData.employee.mdp);
        this.cookieService.set('id', resultData.employee._id);
        this.router.navigateByUrl('home')
      } else {
        this.errorMessage="Email ou Mot de passe incorrecte";
        console.log("Error login");
      }
    });
  }
}
