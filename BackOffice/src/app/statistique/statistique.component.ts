import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto'; // Importez ChartType depuis 'chart.js/auto'

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.createChart('graph1', 'Bar Chart', 'bar', ['January', 'February', 'March', 'April', 'May', 'June', 'July'], [65, 59, 80, 81, 56, 55, 40]);
    this.createChart('graph2', 'Line Chart', 'pie', ['January', 'February', 'March', 'April', 'May', 'June', 'July'], [65, 59, 80, 81, 56, 55, 40]);
    this.createChart('graph3', 'Pie Chart', 'bar', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
    this.createChart('graph4', 'Doughnut Chart', 'polarArea', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
    this.createChart('graph5', 'Radar Chart', 'bar', ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
    this.createChart('graph6', 'Polar Area Chart', 'doughnut', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3]);
    this.createChart('graph7', 'Bubble Chart', 'bar', ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
    this.createChart('graph8', 'Scatter Chart', 'polarArea',['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
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
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
    }
    return colors;
  }
}
