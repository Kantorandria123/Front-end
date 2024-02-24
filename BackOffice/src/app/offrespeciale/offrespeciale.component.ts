import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-offrespeciale',
  templateUrl: './offrespeciale.component.html',
  styleUrl: './offrespeciale.component.css'
})
export class OffrespecialeComponent implements OnInit{
  clients: any[] =[];
  services: any[] = [];
  offrespecials: any[] = [];
  titre: string = '';
  description: string = '';
  datedebut: string = '';
  datefin: string = '';
  service_id: string = '';

  constructor(private router: Router,private http: HttpClient,private route: ActivatedRoute, private cookieService: CookieService){}
  ngOnInit(): void {
    this.getListService();
    this.getListOffrespecial();
  }
  getListService() {
    const url = environment.baseUrl+'/service/lesservices';
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.services) {
          this.services = response.services;
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }

  creerOffrespeciale() {
    const bodyData = {
      titre: this.titre,
      description: this.description,
      datedebut: this.datedebut,
      datefin: this.datefin,
      service_id: this.service_id,
    };
    this.http.post(environment.baseUrl + '/offrespecial/creer', bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status){
          this.getListClient().subscribe(
            (clients: any[]) => {
              console.log(clients.length);
              // window.location.reload();
            },
            (clientError) => {
              console.error('Erreur lors de la récupération de la liste des clients :', clientError);
            }
          );
        } else {
          console.log("La création de l'offre spéciale a échoué.");
        }
      },
      (error) => {
        console.error("Erreur lors de la création de l'offre spéciale :", error); // Affichage de l'erreur renvoyée par le serveur
      }
    );
  }

  getListOffrespecial() {
    const url = environment.baseUrl+'/offrespecial/lesoffrespecial';

    this.http.get<any>(url).subscribe(
      (response) => {

        if (response.status && response.offrespecialList) {
          this.offrespecials = response.offrespecialList;
        } else {
          console.error('Réponse innatendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des offres spécial :', error);
      }
    );
  }

  getListClient (): Observable<any[]> {
    const url = environment.baseUrl +  `/client/lesclients`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.clients) {
          return response.clients;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des clients');
      })
    );
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
                      for (let i = 0; i < this.offrespecials.length; i++) {
                        htmlContent += `
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Votre rendez-vous pour le ${this.offrespecials[i].service_info.nom} le ${(this.offrespecials[i].daty)} à ${this.offrespecials[i].horaire} avec ${this.offrespecials[i].employe_info.nom}</p>
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

}
