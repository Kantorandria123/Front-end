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
  montant: number=0;
  date: string="";
  type: string="";
  depenses: any[] =[];
  pageSize = 10;
  page = 0;
  pagedDepenses: any[] = [];
  searchTerm: string = '';
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
          this.updatePageDepenses();
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des depense :', error);
      }
    );
  }
  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.updatePageDepenses();
  }
  updatePageDepenses() {
    const filteredServices = this.depenses.filter(depense =>
      depense.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = this.page * this.pageSize;
    this.pagedDepenses = filteredServices.slice(startIndex, startIndex + this.pageSize);
  }
}
