import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  nom: string="";
  email: string="";
  phone: string="";
  mdp: string="";
  argent: number=0;
  token: string = "";
  strongMessage: string="";
  messageInscrit: string = "";
  showPassword: boolean = false;

  constructor(private router: Router,private http: HttpClient)
  {

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  inscription() {
    console.log("inscription");
    let bodyData = {
      "nom" : this.nom,
      "email" : this.email,
      "phone" : this.phone,
      "mdp" : this.mdp,
      "argent": this.argent,
      "token": this.token
    };
    console.log("bodyData : "+bodyData);
    this.http.post("http://localhost:3000/client/create",bodyData).subscribe((resultData: any)=>
    {

        if (resultData.status)
        {
          this.strongMessage="C'est fait! "
          this.messageInscrit="inscription reussi."
        }
        else
         {
          this.strongMessage="Attention! "
          this.messageInscrit="Erreur de l'inscription."
         }
    });
  }

}
