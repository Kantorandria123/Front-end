import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-offrespeciale',
  templateUrl: './offrespeciale.component.html',
  styleUrl: './offrespeciale.component.css'
})
export class OffrespecialeComponent implements OnInit{
  services: any[] = [];
  offrespecials: any[] = [];
  titre: string = '';
  description: string = '';
  datedebut: string = '';
  datefin: string = '';
  service_id: string = '';

  constructor(private router: Router,private http: HttpClient,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getListService();
    this.getListOffrespecial();
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

  creerOffrespeciale() {
    const bodyData = {
      titre: this.titre,
      description: this.description,
      datedebut: this.datedebut,
      datefin: this.datefin,
      service_id: this.service_id,
    };
    this.http.post(environment.baseUrl + '/offrespecial/creer', bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status){
          window.location.reload();
        } else {
          console.log("La création de l'offre spéciale a échoué.");
        }
      },
      (error) => {
        console.error("Erreur lors de la création de l'offre spéciale :", error); // Affichage de l'erreur renvoyée par le serveur
      }
    );
  }

  getListOffrespecial() {
    const url = environment.baseUrl+'/offrespecial/lesoffrespecial';

    this.http.get<any>(url).subscribe(
      (response) => {

        if (response.status && response.offrespecialList) {
          this.offrespecials = response.offrespecialList;
        } else {
          console.error('Réponse innatendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des offres spécial :', error);
      }
    );
  }

}
