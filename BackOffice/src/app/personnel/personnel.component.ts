import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map, catchError, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.css'
})
export class PersonnelComponent implements OnInit{

  employes: any[] = [];
  constructor(private http: HttpClient) {}
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

}
