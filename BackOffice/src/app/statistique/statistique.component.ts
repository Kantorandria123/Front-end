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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
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


    this.createChart('graph4', 'Doughnut Chart', 'polarArea', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
    this.createChart('graph5', 'Radar Chart', 'bar', ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
    this.createChart('graph6', 'Polar Area Chart', 'doughnut', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
    this.createChart('graph7', 'Bubble Chart', 'bar', ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
    this.createChart('graph8', 'Scatter Chart', 'polarArea', ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
    this.createChart('graph9', 'Pie Chart', 'bar', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
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
}
