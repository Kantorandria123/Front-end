import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  rendezvous: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}

  ngOnInit(){
    this.listeRendezvousEmployee();
  }

  listeRendezvousEmployee() {
    const employee_id = this.cookieService.get('id_admin');

    if(employee_id) {
      const url = environment.baseUrl+`/rendezvous/employeerendezvous/${employee_id}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
        }
      );
    } else {
      console.error('client_id non trouvé dans le cookie.');
    }
  }
}
