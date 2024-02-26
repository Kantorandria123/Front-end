import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';




@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrl: './profil-client.component.css'
})
export class ProfilClientComponent implements OnInit {
  client: any[] = [];
  nom: string = '';
  email: string = '';
  phone: string = '';


  constructor(private http: HttpClient,private cookieService: CookieService) {}


    ngOnInit(): void {
   this.listeClientById();
  }


  listeClientById() {
    const clientId = this.cookieService.get('id');
     if(clientId) {
      const url = environment.baseUrl+`/client/clientbyId/${clientId}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.clients) {
            if (Array.isArray(response.clients)) {
              this.client = response.clients;
            } else {
              this.client = [response.clients];
            }
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des clients :', error);
        }
      );
     } else {
      console.error('clientId non trouvé dans le cookie.');
     }
  }

  updateClient() {
    const clientId = this.cookieService.get('id');
    if(clientId) {
      const url = environment.baseUrl+`/client/clientupdate/${clientId}`;
      this.nom = this.client[0].nom;
      this.email = this.client[0].email;
      this.phone = this.client[0].phone;
      let formData = {
        nom:this.nom,
        email: this.email,
        phone:this.phone
      };;
      this.http.post<any>(url, formData).subscribe(
        (response) => {
          if(response.status && response.updatedClient) {
            this.cookieService.delete('email');
            this.cookieService.set('email', this.email);
            window.location.reload();
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error("Erreur lors de la mise à jour du client:", error);
        }
      );
    } else {
      console.error('clientId non trouvé dans le cookie.');

    }
  }

}
