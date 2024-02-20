import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrl: './depense.component.css'
})
export class DepenseComponent {
  description: string="";
  montant: string="";
  date: string="";
  type: string="";

  constructor(private router: Router,private http: HttpClient) {}

  depenseCreate() {
    const bodyData = {
      description: this.description,
      montant: this.montant,
      date: this.date,
      type: this.type,
    };

    this.http.post(environment.baseUrl + '/depense/creer',bodyData).subscribe(
      (resultData: any) => {
      if(resultData.status) {
        window.location.reload();
      } else {
        console.error('Réponse inattendue du serveur');
      }
    },
    (error) => {
      console.error('Error creating dépense:', error);
    }
    
    );
  }

}
