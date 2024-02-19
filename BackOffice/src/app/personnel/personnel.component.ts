import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map, catchError, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.css'
})
export class PersonnelComponent implements OnInit{

  employes: any[] = [];
  nom: string = '';
  email: string = '';
  horaireDebut: string = '';
  horaireFin: string = '';

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.getListEmployes().subscribe(
      (data) => {
        this.employes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
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
  creerEmploye() {
    let bodyData = {
      nom: this.nom,
      email: this.email,
      horaireTravail: this.horaireDebut+" - "+this.horaireFin,
    };

   this.http.post(environment.baseUrl+"/employe/create", bodyData).subscribe ( (resultData: any) => {
      if (resultData.status) {
        window.location.reload();
      } else {

      }
    });
  }
  deleteEmployee(employeeId:string) {
    this.http.delete(environment.baseUrl+`/employe/supprimer/${employeeId}`).subscribe(
      (response) => {
        console.log('Employé supprimé avec succès :', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }

}
