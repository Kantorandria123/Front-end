import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  services: any[] = [];
  employes: any[] = [];
  daty: string = '';
  horaire: string = '';
  description: string = '';
  employee_id: number  = 1;
  service_id: number  = 1;
  client_id: number  = 0;
  nonConnecter: string = "";
  erroMessage:string="";
  msg_rendevous:string="";
  strong_msg:string="";
  isError:boolean=false;
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  ngOnInit() {
    console.log("*************Rendez-vous******************");
    this.getListEmploye();
    this.getListService();

  }

  getListService() {
    const url = 'http://localhost:3000/service/lesservices';

    this.http.get<any>(url).subscribe(
      (response) => {
        // La réponse contient la liste des services
        if (response.status && response.services) {
          this.services = response.services;
          console.log('Liste des services :', this.services);
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }
  getListEmploye() {
    const url = 'http://localhost:3000/employe/lesEmployes';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.employes) {
          this.employes = response.employes;
          console.log('Liste des services :', this.employes);
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }
  creerRendezVous()
  {
    const client_idCookie = this.cookieService.get('id');
    const emailCookie = this.cookieService.get('email');
    const tokenCookie = this.cookieService.get('token');

    if (client_idCookie && emailCookie && tokenCookie)
    {
        var message="";
        const currentDate = new Date();
        const selectedDateStr = this.daty + ' ' + this.horaire;
        const selectedDate = new Date(selectedDateStr);
        if (selectedDate < currentDate) {
          this.isError = true;
          this.strong_msg="Erreur! ";
          message+="La date du rendez-vous ne peut pas être antérieure à la date actuelle.";
        }
        else{
          this.isError=false;
        }
        console.log("isError "+this.isError);
        if(!this.isError)
        {
              this.client_id=parseInt(client_idCookie);
              let bodyData =
              {
                "daty" : this.daty,
                "horaire" : this.horaire,
                "description" : this.description,
                "service_id" : this.service_id,
                "employee_id" : this.employee_id,
                "client_id": this.client_id
              };
              this.http.post("http://localhost:3000/rendezvous/creer",bodyData).subscribe((resultData: any)=>
              {
                  console.log(resultData);
                  this.strong_msg="C'est fait! ";
                  this.msg_rendevous="vous avez faire un nouveau rendez-vous";
                  //alert("rendez-vous Registered Successfully")
              });
        }
        else
        {
            this.msg_rendevous=message;
        }

     }
     else {
       //alert("il faut que vous connecter!!");
       this.nonConnecter="Veuillez connecter pour faire de rendez-vous";
     }
  }

}
