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
  updateEtat(id: string, etat: number) {
    this.http.get<any>(environment.baseUrl+`/depot/modifieretat/${id}/${etat}`).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
  updateArgent(id: string, montant: number) {
    let bodyData = {
      _id: id,
      argent: montant,
    };
    this.http.post(environment.baseUrl+"/depot/updateargent", bodyData).subscribe ( (resultData: any) => {

    });
  }
  valider(id:string,client_id:string,montant:number)
  {
      this.updateEtat(id,2);
      this.updateArgent(client_id,montant);
     window.location.reload();
  }

}
