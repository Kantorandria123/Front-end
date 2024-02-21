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
  sendEmailData(emailData: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl+'/email/send', emailData);
  }
  sendEmail(): void {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const emailCookie = this.cookieService.get('email');
      let htmlContent = `
      <!DOCTYPE html>
        <html lang="fr">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href='https://fonts.googleapis.com/css?family=Great Vibes' rel='stylesheet'>
          <title>Notification de rendez-vous</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;text-align: center;">
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
          
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <!-- LOGO -->
              <tr>
                  <td bgcolor="#fd5d5d" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#fd5d5d" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111;font-family: 'Great Vibes'; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-family: 'Great Vibes',cursive;font-size: 48px; font-weight: 400; margin: 2;">Beauty Care!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> `;
                      for (let i = 0; i < this.rendezvous.length; i++) {
                        htmlContent += `
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Votre rendez-vous pour le ${this.rendezvous[i].service_info.nom} le ${this.formatDate(this.rendezvous[i].daty)} à ${this.rendezvous[i].horaire} avec ${this.rendezvous[i].employe_info.nom}</p>
                              </td>
                          </tr> `;
                      }
                      htmlContent += `
                          
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Merci de faire confiance à Beauty Care pour vos soins</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Cordialement,<br>Team Beauty Care!</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Besoin d'aide?</h2>
                                  <p style="margin: 0;"><a href="#" target="_blank" style="color: #fd5d5d;text-decoration:none;">N&rsquo;hésitez pas à nous contacter</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>

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

