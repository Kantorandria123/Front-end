import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
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
  imageFile: File | null = null;
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
            if (Array.isArray(response.employes)) {
              this.employees = response.employes;
            } else {
              this.employees = [response.employes];
            }
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
      this.nom=this.employees[0].nom;
      this.email=this.employees[0].email;
      this.image=this.employees[0].image;
      const newData = {
        nom: this.nom,
        email: this.email,
        image: environment.baseUrl+"/uploads/images/"+this.image
      };

      this.http.patch<any>(url, newData).subscribe(
        (response) => {
          if (response.status && response.updatedEmployee) {
            window.location.reload();
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
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.imageFile = target.files[0];
    }
  }

}
