import { HttpClient } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profil-employee',
  templateUrl: './profil-employee.component.html',
  styleUrl: './profil-employee.component.css'
})
export class ProfilEmployeeComponent implements OnInit{
  nom: string = '';
  email: string = '';
  image: string ='';
  horaireTravail: string = '';
  employees: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}
  ngOnInit(): void {
    this.listeEmployeeById();
  }

  listeEmployeeById() {
    const employeeId = this.cookieService.get('id');
     if(employeeId) {
      const url = `http://localhost:3000/employe/employebyId/${employeeId}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response.status && response.employes) {
            // Check if employes is an array, if not, convert it to an array
            if (Array.isArray(response.employes)) {
              this.employees = response.employes;
            } else {
              // If employes is an object, convert it to an array
              this.employees = [response.employes];
            }
            console.log("Liste employées :", this.employees);
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des employées :', error);
        }
      );
     } else {
      console.error('employeeId non trouvé dans le cookie.');
     }
  }

  updateEmployee() {
    const employeeId = this.cookieService.get('id');
    if(employeeId) {
      const url = `http://localhost:3000/employe/employeupdate/${employeeId}`;
      const newData = {
        nom: this.nom,
        email: this.email,
        image: this.image,
        horaireTravail: this.horaireTravail
      };

      this.http.patch<any>(url, newData).subscribe(
        (response) => {
          if (response.status && response.updatedEmployee) {
            console.log("Employé mis à jour avec succès :", response.updatedEmployee);
            // Mettre à jour les données affichées dans votre composant si nécessaire
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'employé :", error);
        }
      );

    } else {
      console.error('employeeId non trouvé dans le cookie.');

    }
  }

}
