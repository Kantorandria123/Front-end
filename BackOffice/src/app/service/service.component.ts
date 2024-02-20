import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  nom: string="";
  description: string="";
  image: string="";
  prix: string="";
  duree: string="";
  commission: string="";
  strongMessage: string="";

  constructor(private router: Router,private http: HttpClient){}

  serviceCreate() {
    console.log('service');
    let bodyData = {
      "nom": this.nom,
      "description": this.description,
      "image": this.image,
      "prix": this.prix,
      "duree": this.duree,
      "commission": this.commission,
    };
    console.log("bodyData : "+bodyData);
    this.http.post(environment.baseUrl+"/service/creer",bodyData).subscribe((resultData: any)=> {
      if (resultData.status){
        this.strongMessage="Service créer"
      } else {
        this.strongMessage="Service non créer"
      }
    });
  }

}
