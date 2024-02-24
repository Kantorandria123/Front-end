import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent {
  montant: string ='';
  client_id: string  = '';
  constructor(
    public dialogRef: MatDialogRef<DepotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,private cookieService: CookieService
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createDepot() {
    const client_idCookie = this.cookieService.get('id');

    if(client_idCookie) {
      this.client_id = client_idCookie;
      let bodyData =
      {
        "montant": this.montant,
        "client_id": this.client_id,
      }
      this.http.post(environment.baseUrl +"/depot/creer", bodyData).subscribe(
        (resultData: any) => {
          if (resultData.status) {
            window.location.reload();
          } else {
            console.log("La dépôt d'argent a échoué.");
          }
        },
        (error) => {
          console.error('Erreur lors de la dépôt d\'argent :', error);
        }
      );
    } else {

    }
  }
}
