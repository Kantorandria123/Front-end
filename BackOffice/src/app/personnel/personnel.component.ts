import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  employes: any[] = [];
  nom: string = '';
  email: string = '';
  horaireDebut: string = '';
  horaireFin: string = '';
  pageSize = 10;
  page = 0;
  pagedEmployes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getListEmployes().subscribe(
      (data) => {
        this.employes = data;
        this.updatePagedEmployes();
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }

  getListEmployes(): Observable<any[]> {
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
        return throwError('Erreur lors de la récupération de la liste des employes');
      })
    );
  }

  updatePagedEmployes() {
    const startIndex = this.page * this.pageSize;
    this.pagedEmployes = this.employes.slice(startIndex, startIndex + this.pageSize);
  }

  creerEmploye() {
    let bodyData = {
      nom: this.nom,
      email: this.email,
      horaireTravail: this.horaireDebut + ' - ' + this.horaireFin,
    };

    this.http.post(environment.baseUrl + '/employe/create', bodyData).subscribe((resultData: any) => {
      if (resultData.status) {
        window.location.reload();
      } else {
        // Gérer le cas où la création a échoué
      }
    });
  }

  deleteEmployee(employeeId: string) {
    this.http.delete(environment.baseUrl + `/employe/supprimer/${employeeId}`).subscribe(
      (response) => {
        console.log('Employé supprimé avec succès :', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.updatePagedEmployes();
  }
}
