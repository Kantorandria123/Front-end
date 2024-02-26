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
  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit(): void {
   this.listeClientById();
  }


  listeClientById() {
    const clientId = this.cookieService.get('id');
    console.log("clientId :" +clientId);
     if(clientId) {
      const url = environment.baseUrl+`/client/clientbyId/${clientId}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.clients) {
            if (Array.isArray(response.clients)) {
              this.client = response.clients;
              console.log("list :" +this.client);
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
}
