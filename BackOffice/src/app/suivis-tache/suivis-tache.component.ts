import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable,map, catchError, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-suivis-tache',
  templateUrl: './suivis-tache.component.html',
  styleUrl: './suivis-tache.component.css'
})
export class SuivisTacheComponent implements OnInit{

  tachesAfaires: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit(): void {
    this.getListTaches(1).subscribe(
      (data) => {
        this.tachesAfaires = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
      }
    );
  }
  getListTaches(etat: number): Observable<any[]> {
    const emp_id = this.cookieService.get('id');
    if (emp_id) {
      const url = environment.baseUrl + `/tache/liste/${emp_id}/${etat}`;

      return this.http.get<any[]>(url).pipe(
        map((response: any) => {
          if (response.status && response.tacheList) {
            return response.tacheList;
          } else {
            console.error('Réponse inattendue du serveur :', response);
            return [];
          }
        }),
        catchError((error) => {
          return throwError('Erreur lors de la récupération de la liste des tache');
        })
      );
    } else {
      return of([]);
    }
  }
  debuter()
  {

  }
}
