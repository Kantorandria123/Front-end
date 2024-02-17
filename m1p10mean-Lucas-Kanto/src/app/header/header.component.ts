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
              this.sendEmail();
              localStorage.setItem('emailSent', 'true');
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
  sendEmailData(emailData: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl+'/email/send', emailData);
  }
  sendEmail(): void {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const emailCookie = this.cookieService.get('email');
      let htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 10px;
              }
              p {
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Notification de rendez-vous</h1>
              <ul>`;
      for (let i = 0; i < this.rendezvous.length; i++) {
        htmlContent += `
          <li>
            ${this.rendezvous[i].service_info.nom} le ${this.formatDate(this.rendezvous[i].daty)} à ${this.rendezvous[i].horaire} avec ${this.rendezvous[i].employe_info.nom}
          </li>`;
      }
      htmlContent += `
              </ul>
              <p>Merci.</p>
            </div>
          </body>
        </html>
      `;
      const emailData = {
        to: emailCookie,
        subject: 'Notification Rendez-vous',
        html: htmlContent
      };

      this.sendEmailData(emailData).subscribe(
        response => {
          console.log('E-mail envoyé avec succès:', response);
        },
        error => {
          //console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
      );
    }
  }


    formatDate(date: string): string {
      return format(new Date(date), 'MMMM do, yyyy', { locale: fr });
    }

}

