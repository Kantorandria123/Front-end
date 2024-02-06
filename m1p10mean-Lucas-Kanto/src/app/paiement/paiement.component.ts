import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css'
})
export class PaiementComponent {
  title = 'angular-drag-drop-tutorial';
  rendezvous: any[] = [];
  payer: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}

  ngOnInit() {
    this.getListPaiement();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getListPaiement() {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const url = `http://localhost:3000/rendezvous/lesrendezvous/${client_id}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          // La réponse contient la liste des rendezvous
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
            console.log('Liste des rendezvous :', this.rendezvous);
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
        }
      );
    } else {
      console.error('client_id non trouvé dans le cookie.');
    }
  }

}
