import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DepotComponent } from '../depot/depot.component';
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
  emailSent: boolean = false;
  ngOnInit() {
    this.checkNotificationRendezvous();
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

    }
  }
  deconnection()
  {
    this.cookieService.delete('id');
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    localStorage.clear();
    location.reload();
  }
  checkNotificationRendezvous() {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const url = environment.baseUrl+`/rendezvous/notification/${client_id}`;
      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
            this.notif = this.rendezvous.length;
            const emailSent = localStorage.getItem('emailSent');
            if (this.rendezvous.length > 0 && !emailSent) {

            }
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

  openDepotModal(): void {
    if (!this.modalOpened) {
      const dialogRef = this.dialog.open(DepotComponent, {
        data: {title: 'Dépôt d\'argent'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.modalOpened = false;
      });

      this.modalOpened = true;
    }
  }



    formatDate(date: string): string {
      return format(new Date(date), 'MMMM do, yyyy', { locale: fr });
    }

}

