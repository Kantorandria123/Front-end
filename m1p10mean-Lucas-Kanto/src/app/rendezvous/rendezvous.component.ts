import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  services: any[] = [];
  employes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("*************Rendez-vous******************");
    this.getListService();
    this.getListEmploye();
  }

  getListService() {
    const url = 'http://localhost:3000/service/lesservices';

    this.http.get<any>(url).subscribe(
      (response) => {
        // La réponse contient la liste des services
        if (response.status && response.services) {
          this.services = response.services;
          console.log('Liste des services :', this.services);
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }
  getListEmploye() {
    const url = 'http://localhost:3000/employe/lesEmployes';

    this.http.get<any>(url).subscribe(
      (response) => {
        // La réponse contient la liste des services
        if (response.status && response.employes) {
          this.employes = response.employes;
          console.log('Liste des services :', this.employes);
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }
}
