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
  pageSize = 10;
  page = 0;
  pagedServices: any[] = [];
  constructor(private router: Router,private http: HttpClient){}
  ngOnInit(): void {
    this.getListService();
  }

  serviceCreate() {
    let bodyData = {
      "nom": this.nom,
      "description": this.description,
      "image": this.image,
      "prix": this.prix,
      "duree": this.duree,
      "commission": this.commission,
    };
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
          this.updatePageServices();
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }
  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.updatePageServices();
  }
  updatePageServices() {
    const startIndex = this.page * this.pageSize;
    this.pagedServices = this.services.slice(startIndex, startIndex + this.pageSize);
  }

}
