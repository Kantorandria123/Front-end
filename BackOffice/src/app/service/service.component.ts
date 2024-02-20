import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{
  services: any[] = [];
  nom: string="";
  description: string="";
  image: string="";
  prix: string="";
  duree: string="";
  commission: string="";
  strongMessage: string="";

  constructor(private router: Router,private http: HttpClient){}
  ngOnInit(): void {
    this.getListService();
  }

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

  getListService() {
    const url = environment.baseUrl+'/service/lesservices';
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.services) {
          this.services = response.services;
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }

}
