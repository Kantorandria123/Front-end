import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import du CommonModule

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule], // Ajout du CommonModule ici
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  showSpinner: boolean = true;

  ngOnInit(): void {
    console.log("showSpinner : "+this.showSpinner);
    window.addEventListener('load', () => {
      this.showSpinner = false; // Masquer le spinner lorsque la page est complètement chargée
    });
  }
}
