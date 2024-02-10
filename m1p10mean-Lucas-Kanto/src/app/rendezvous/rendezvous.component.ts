import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

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
  employee_id: string  = '';
  service_id: string  = '';
  client_id: string  = '';
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
    const url = environment.baseUrl+'/service/lesservices';

    this.http.get<any>(url).subscribe(
      (response) => {
        // La réponse contient la liste des services
        if (response.status && response.services) {
          this.services = response.services;
          if (this.services.length > 0) {
            this.service_id = this.services[0]._id;
          }
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
    const url = environment.baseUrl+'/employe/lesEmployes';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.employes) {
          this.employes = response.employes;
          if (this.employes.length > 0) {
            this.employee_id = this.employes[0]._id;
          }
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
              this.client_id=client_idCookie;
              let bodyData =
              {
                "daty" : this.daty,
                "horaire" : this.horaire,
                "description" : this.description,
                "service_id" : this.service_id,
                "employee_id" : this.employee_id,
                "client_id": this.client_id
              };
              this.http.post(environment.baseUrl+"/rendezvous/creer",bodyData).subscribe((resultData: any)=>
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
