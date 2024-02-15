import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

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
