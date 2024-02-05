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

  constructor(private router: Router,private http: HttpClient)
  {
   
  }

  inscription() {
    let bodyData = {
      "nom" : this.nom,
      "email" : this.email,
      "phone" : this.phone,
      "mdp" : this.mdp,
      "argent": this.argent,
      "token": this.token,

    };
    this.http.post("http://localhost:3000/client/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registered Successfully");

        if (resultData.status) 
        {
      
           this.router.navigateByUrl('/login');
    

        } 
        else
         {
          console.log("Errror inscription");
        }
    });
  }
}
