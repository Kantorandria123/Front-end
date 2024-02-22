import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent implements OnInit {
  depots: any[] = [];

  constructor(private router: Router,private http: HttpClient){}
  ngOnInit(): void {
    this.getListerDepot();
  }
  getListerDepot() {
    const url = environment.baseUrl+'/depot/liste';
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.depotList) {
          this.depots = response.depotList;
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des dépôt :', error);
      }
    );
  }

}
