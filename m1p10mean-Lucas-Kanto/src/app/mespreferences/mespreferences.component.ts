import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mespreferences',
  templateUrl: './mespreferences.component.html',
  styleUrl: './mespreferences.component.css'
})
export class MespreferencesComponent implements OnInit{
  services: any[] = [];
  employes: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit() {
    this.getListEmploye();
    this.getListService();

  }
  getListService() {
    const client_id = this.cookieService.get('id');
    const url = environment.baseUrl+`/preference/service/liste/${client_id}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.preferenceslist) {
          console.log(response.services);
          this.services = response.preferenceslist;
          console.log("taille = "+response.preferenceslist.length);
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
    const client_id = this.cookieService.get('id');
    const url = environment.baseUrl+`/preference/employe/liste/${client_id}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.preferenceslist) {
          console.log(response.services);
          this.employes = response.preferenceslist;
          console.log("taille = "+response.preferenceslist.length);
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
