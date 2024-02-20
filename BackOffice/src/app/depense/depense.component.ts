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
  depenses: any[] =[];

  constructor(private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    this.listeDepense();
    
  }

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

  listeDepense() {
    const url = environment.baseUrl+'/depense/listedepense';
    this.http.get<any>(url).subscribe(
      (response) => {
        if(response.status && response.depenses) {
          this.depenses = response.depenses;
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des depense :', error);
      }
    );
  }

}
