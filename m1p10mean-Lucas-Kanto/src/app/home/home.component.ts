import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  services: any[] = [];
  offrespecials: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit() {
    this.getListService();
    this.getListOffrespecial();
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

    getListOffrespecial() {
      const url = 'http://localhost:3000/offrespecial/lesoffrespecial';

      this.http.get<any>(url).subscribe(
        (response) => {

          if (response.status && response.offrespecialList) {
            this.offrespecials = response.offrespecialList;
            console.log('Liste des offres spécial :', this.offrespecials);
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
