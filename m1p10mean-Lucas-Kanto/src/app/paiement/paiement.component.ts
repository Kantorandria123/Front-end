import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  rendezvous: any[] = [];
  rendezvous2: any[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    this.getListRendezVous();
  }

  start(event: any) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", event.target.getAttribute("id"));
  }

  over(event: any) {
    event.currentTarget.className = "class2";
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  drop(event: any) {
    let id = event.dataTransfer.getData("text");
    let obj = document.getElementById(id);
    event.currentTarget.appendChild(obj);

    let inputElement = obj?.querySelector("input[type='hidden']") as HTMLInputElement | null;
    if (inputElement) {
        let inputText = inputElement.value;
        console.log("La valeur de l'input déplacé est : " + inputText);
    } else {
        console.log("Aucun input de type 'hidden' trouvé dans l'élément déplacé.");
    }

    event.currentTarget.className = "class1";
    event.preventDefault();
    event.stopPropagation();
    return false;
}



  leave(event: any) {
    event.currentTarget.className = "class1";
    event.preventDefault();
    event.stopPropagation();
    return false;
  }



  getListRendezVous() {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const url = environment.baseUrl+`/rendezvous/lesrendezvous/${client_id}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          // La réponse contient la liste des rendezvous
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
            this.rendezvous2 = response.rendezvousList;
            console.log('Liste des rendezvous :', this.rendezvous);
          } else {
          console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
        }
      );
    }
  }
}
