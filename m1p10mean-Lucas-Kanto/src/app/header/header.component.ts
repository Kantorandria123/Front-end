import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  resultData: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private cookieService: CookieService,public dialog: MatDialog) { }
  messageNotif:string="";
  notif:number=0;
  rendezvous: any[] = [];
  modalOpened: boolean = false;
  ngOnInit() {
    this.getListNotificationRendezvous();

    const idcookie = this.cookieService.get('id');
    const emailCookie = this.cookieService.get('email');
    const tokenCookie = this.cookieService.get('token');

    if (idcookie && emailCookie && tokenCookie) {
      let bodyData = {
        email: emailCookie,
        token: tokenCookie,
      };

      this.http.post(environment.baseUrl+"/client/getbytoken", bodyData).subscribe((resultData: any) => {
        this.resultData=resultData;
      });
      console.log("resuldata : "+this.resultData);
    }
  }
  deconnection()
  {
    this.cookieService.delete('id');
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    location.reload();
  }
  getListNotificationRendezvous() {
    const client_id = this.cookieService.get('id');

    if (client_id) {
      const url = environment.baseUrl+`/rendezvous/notification/${client_id}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
            this.notif = this.rendezvous.length;
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous notifier:', error);
        }
      );
    }
  }

  openModal(): void {
    if (!this.modalOpened) {
      const dialogRef = this.dialog.open(ModalComponentComponent, {
        data: { title: 'Vos rendez vous',rendezvous:this.rendezvous }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.modalOpened = false;
      });

      this.modalOpened = true;
    }
  }
}

