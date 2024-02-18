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
  tachesEnCours: any[] = [];
  tachesTermines: any[] = [];


  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit(): void {
    this.getListTaches(1).subscribe(
      (data) => {
        this.tachesAfaires = data;
        console.log(this.tachesAfaires);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
      }
    );
    this.getListTaches(2).subscribe(
      (data) => {
        this.tachesEnCours = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
      }
    );
    this.getListTaches(3).subscribe(
      (data) => {
        this.tachesTermines = data;
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
  debuter(id: string)
  {
      this.updateEtat(id,2);
      window.location.reload();
  }
  finaliser(id: string,rendezvous:string)
  {
      this.updateEtat(id,3);
      this.updateEtaRendezvous(rendezvous,5);
      window.location.reload();
  }
  updateEtat(id: string, etat: number) {
    this.http.get<any>(environment.baseUrl+`/tache/modifieretat/${id}/${etat}`).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
  updateEtaRendezvous(id: string, etat: number) {
    this.http.get<any>(environment.baseUrl+`/rendezvous/modifieretat/${id}/${etat}`).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
