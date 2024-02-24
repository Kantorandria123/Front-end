import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class PreferenceComponent implements OnInit{
  services: any[] = [];
  employes: any[] = [];
  employe_id:string="";
  service_id:string="";
  strongMessage:string="";
  message:string="";
  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit() {
    this.getListEmploye();
    this.getListService();

  }

  getListService() {
    const url = environment.baseUrl+'/service/lesservices';

    this.http.get<any>(url).subscribe(
      (response) => {
        // La réponse contient la liste des services
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
  getListEmploye() {
    const url = environment.baseUrl+'/employe/lesEmployes';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.employes) {
          this.employes = response.employes;

        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }
  favoris(choix_id: any, type: any, nom: any) {
    console.log("********mon favoris = " + choix_id);
    const client_idCookie = this.cookieService.get('id');
    if (client_idCookie) {
      if (parseInt(type) === 1) {
        console.log("==> service io");
        this.service_id = choix_id;
        let bodyData = {
          "service_id": this.service_id,
          "client_id": client_idCookie
        };
        console.log("bodyData emp : " + JSON.stringify(bodyData));
        this.http.post(environment.baseUrl+"/preference/service/creer", bodyData).subscribe(
          (resultData: any) => {
            console.log("resulData.status = " + resultData.status);
            if (resultData.status) {
              this.strongMessage="C'est fait!";
              this.message = "Nouveau favoris service ajout(e)  : " + nom + ".";
            }
          },
          (error: any) => {
            this.strongMessage="Attention! ";
            this.message = "Cette service est déjà dans vos favoris";
          }
        );
      }

      if (parseInt(type) === 11) {
        console.log("==> employe io");
        this.employe_id = choix_id;
        let bodyData = {
          "employe_id": this.employe_id,
          "client_id": client_idCookie
        };
        console.log("bodyData emp : " + JSON.stringify(bodyData));
        this.http.post(environment.baseUrl+"/preference/employe/creer", bodyData).subscribe(
          (resultData: any) => {
            console.log("resulData.status = " + resultData.status);
            if (resultData.status) {
              this.strongMessage="C'est fait!";
              this.message = "Nouveau favoris employe ajout(e)  : " + nom + ".";
            }
          },
          (error: any) => {
            console.error('Erreur lors de la requête HTTP :', error);
            this.strongMessage="Attention! ";
            this.message = "Cette employe est déjà dans vos favoris";
          }
        );
      }

    } else {
      alert("Veuillez vous connecter");
    }
  }

}
