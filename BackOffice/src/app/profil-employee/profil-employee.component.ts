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

}
