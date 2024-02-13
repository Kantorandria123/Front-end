import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { Observable,map, catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  rendezvous: any[] = [];
  rendezvousApayer: any[] = [];
  @ViewChildren('rdvIdInput')
  rdvInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('rdvPrixInput')
  rdvPrixInput!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    this.getListRendezVous(1).subscribe(
      (data) => {
        this.rendezvous = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
      }
    );
    this.getListRendezVous(2).subscribe(
      (data) => {
        this.rendezvousApayer = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des rendezvous 2:', error);
      }
    );
  }

  start(event: any) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", event.target.getAttribute("id"));
  }

  over(event: any) {
    event.currentTarget.className = "class2";
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  drop(event: any) {
    let id = event.dataTransfer.getData("text");
    let obj = document.getElementById(id);
    event.currentTarget.appendChild(obj);

    let inputElement = obj?.querySelector("input[type='hidden']") as HTMLInputElement | null;
    if (inputElement) {
        let inputText = inputElement.value;
        console.log("La valeur de l'input déplacé est : " + inputText);
        let rendezvousId = inputElement.value;
        this.updateEtatRendezVous(rendezvousId, 2);
        window.location.reload();
    } else {
        console.log("Aucun input de type 'hidden' trouvé dans l'élément déplacé.");
    }

    event.currentTarget.className = "class1";
    event.preventDefault();
    event.stopPropagation();
    return false;
}



  leave(event: any) {
    event.currentTarget.className = "class1";
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  getListRendezVous(etat: number): Observable<any[]> {
    const client_id = this.cookieService.get('id');
    if (client_id) {
      const url = environment.baseUrl + `/rendezvous/lesrendezvous/${client_id}/${etat}`;

      return this.http.get<any[]>(url).pipe(
        map((response: any) => {
          if (response.status && response.rendezvousList) {
            return response.rendezvousList;
          } else {
            console.error('Réponse inattendue du serveur :', response);
            return [];
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
          return throwError('Erreur lors de la récupération de la liste des rendezvous');
        })
      );
    } else {
      return of([]);
    }
  }
  updateEtatRendezVous(rendezvousId: string, etat: number) {
    this.http.get<any>(environment.baseUrl+`/rendezvous/modifieretat/${rendezvousId}/${etat}`).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
  validerApayer() {
    const rdvIds: string[] = [];
    this.rdvInputs.forEach(input => {
      rdvIds.push(input.nativeElement.value);
    });
    const rdvPrix: string[] = [];
    this.rdvPrixInput.forEach(input => {
      rdvPrix.push(input.nativeElement.value);
    });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const daty = `${year}-${month}-${day}`;
    console.log("daty "+daty);
    for(let i=0;i<rdvIds.length;i++)
    {
      let bodyData = {
        "rendezvous_id" : rdvIds[i],
        "daty" : daty,
        "prix" : Number(rdvPrix[i]),
        "etat": 1
      };
       console.log(i+" = "+rdvIds[i]+"==> prix : "+Number(rdvPrix[i]));
        this.http.post(environment.baseUrl+"/paiement/creer",bodyData).subscribe((resultData: any)=>
        {
            this.updateEtatRendezVous(rdvIds[i],3);
            window.location.reload();
        });
    }
  }
}
