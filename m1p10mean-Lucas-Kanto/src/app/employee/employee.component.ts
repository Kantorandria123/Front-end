import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employes: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getListEmploye();
  }
  getListEmploye() {
    const url = environment.baseUrl+'/employe/lesEmployes';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.employes) {
          this.employes = response.employes;
          console.log('Liste des services :', this.employes);
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }
}
