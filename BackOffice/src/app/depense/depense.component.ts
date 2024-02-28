import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';

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
  employes: any[] =[];
  bodyData: any = [];
  pageSize = 10;
  page = 0;
  pagedDepenses: any[] = [];
  searchTerm: string = '';
  annee: number=2024;
  mois: number=1;

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
  insertDepense(bodyData:object)
  {
      this.http.post(environment.baseUrl + '/depense/creer',bodyData).subscribe(
        (resultData: any) => {
        if(resultData.status) {
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
  getEmployes(): Observable<any[]> {
    const url = environment.baseUrl + `/employe/lesEmployes`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.employes) {
          return response.employes;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des rendezvousList');
      })
    );
  }
  genererDepenseFixe()
  {
    this.getEmployes().subscribe(
      (employeList) => {
        this.employes = employeList;

                  if(this.type==="salaire")
                  {
                    for(let i=0;i<this.employes.length;i++)
                     {
                          this.bodyData = {
                            description: this.type,
                            montant: this.employes[i].salaire,
                            date: this.annee+"-"+this.mois+"-01",
                            type: this.type,
                          };
                          this.insertDepense(this.bodyData);
                     }
                  }
                  if(this.type==="loyer")
                  {
                     this.bodyData = {
                      description: this.type,
                      montant: this.montant,
                      date: this.annee+"-"+this.mois+"-31",
                      type: this.type,
                    };
                   this.insertDepense(this.bodyData);
                  }

                window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }
  onTypeChange() {

  }
}
