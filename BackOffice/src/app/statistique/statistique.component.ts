import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  employeList: any[] = [];
  chiffresAffairesJour: any[] = [];
  chiffresAffairesMois: any[] = [];
  nombreReservationJour: any[] = [];
  nombreReservationMois: any[] = [];
  beneficeList: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    /*Temps moyen de travail*/
    this.getListEmployes().subscribe(
      (employeList) => {
        this.employeList = employeList;
        const libdataForGraph1 = this.employeList.map(item => item.nom);
        const dataForGraph1 = this.employeList.map(item => item.temps_travail_moyen_par_jour);
        const dataForGraph2 = this.employeList.map(item => item.temps_travail_moyen_par_mois);
        const dataForGraph3 = this.employeList.map(item => item.temps_travail_moyen_par_semaine);
        this.createChart('graph1', 'Temps de travail moyen par jour', 'bar', libdataForGraph1, dataForGraph1);
        this.createChart('graph2', 'Temps de travail moyen par mois', 'line', libdataForGraph1, dataForGraph2);
        this.createChart('graph3', 'Temps de travail moyen par semaine', 'line', libdataForGraph1, dataForGraph3);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );

    /*Chiffres Affaire*/
     this.getChiffresAffairesJour().subscribe(
      (chiffreList) => {
        this.chiffresAffairesJour = chiffreList;
        const libdataForGraph1 = this.chiffresAffairesJour.map(item => item.jourSemaine);
        const dataForGraph1 = this.chiffresAffairesJour.map(item => item.totalMontant);
        this.createChart('graph4', '', 'line',libdataForGraph1,dataForGraph1);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des chiffres :', error);
      }
    );
    this.getChiffresAffairesmois().subscribe(
      (chiffreList) => {
        this.chiffresAffairesMois = chiffreList;
        const libdataForGraph1 = this.chiffresAffairesMois.map(item => item.mois);
        const dataForGraph1 = this.chiffresAffairesMois.map(item => item.totalMontant);
        this.createChart('graph5', 'Radar Chart', 'bar', libdataForGraph1, dataForGraph1);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des chiffres :', error);
      }
    );


    /*Nombre de reservation*/
    this.getNombreReservationJour().subscribe(
      (rendezvousList) => {
        this.nombreReservationJour = rendezvousList;
        const libdataForGraph1 = this.nombreReservationJour.map(item => item.jour);
        const dataForGraph1 = this.nombreReservationJour.map(item => item.count);
        this.createChart('graph6', 'Polar Area Chart', 'doughnut', libdataForGraph1, dataForGraph1);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des chiffres :', error);
      }
    );
    this.getNombreReservationMois().subscribe(
      (rendezvousList) => {
        this.nombreReservationMois = rendezvousList;
        const libdataForGraph1 = this.nombreReservationMois.map(item => item.mois);
        const dataForGraph1 = this.nombreReservationMois.map(item => item.count);
        this.createChart('graph7', 'Bubble Chart', 'bar',libdataForGraph1,dataForGraph1 );
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des chiffres :', error);
      }
    );

    /*Benefice*/
    this.getBenefices().subscribe(
      (beneficeList) => {
        this.beneficeList = beneficeList;
        const libdataForGraph1 = this.beneficeList.map(item => item.mois);
        const dataForGraph1 = this.beneficeList.map(item => item.benefice);
        this.createChart('graph8', 'Scatter Chart', 'polarArea',libdataForGraph1, dataForGraph1);
        this.createChart('graph9', 'Pie Chart', 'bar', libdataForGraph1, dataForGraph1);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des chiffres :', error);
      }
    );

  }

  createChart(canvasId: string, label: string, type: ChartType, labels: string[], data: number[]): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: this.getRandomColorArray(data.length),
            borderColor: this.getRandomColorArray(data.length),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  getRandomColorArray(length: number): string[] {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`);
    }
    return colors;
  }

  getListEmployes(): Observable<any[]> {
    const url = environment.baseUrl + `/employe/tempsmoyentravail`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.employeList) {
          return response.employeList;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des employes');
      })
    );
  }
  getChiffresAffairesJour(): Observable<any[]> {
    const url = environment.baseUrl + `/statistique/chiffreAfaires/jour`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.chiffreList) {
          return response.chiffreList;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des chiffres');
      })
    );
  }
  getChiffresAffairesmois(): Observable<any[]> {
    const url = environment.baseUrl + `/statistique/chiffreAfaires/mois`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.chiffreList) {
          return response.chiffreList;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des chiffres');
      })
    );
  }
   getNombreReservationJour(): Observable<any[]> {
    const url = environment.baseUrl + `/statistique/nombrereservation/jour`;
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
        return throwError('Erreur lors de la récupération de la liste des rendezvousList');
      })
    );
  }
  getNombreReservationMois(): Observable<any[]> {
    const url = environment.baseUrl + `/statistique/nombrereservation/mois`;
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
        return throwError('Erreur lors de la récupération de la liste des rendezvousList');
      })
    );
  }
  getBenefices(): Observable<any[]> {
    const url = environment.baseUrl + `/statistique/benefice/mois`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.beneficeList) {
          return response.beneficeList;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des beneficeList');
      })
    );
  }
}
