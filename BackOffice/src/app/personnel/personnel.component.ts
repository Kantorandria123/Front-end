import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  employes: any[] = [];
  employe:any=null;
  pagedEmployes: any[] = [];
  nom: string = '';
  email: string = '';
  horaireDebut: string = '';
  horaireFin: string = '';
  pageSize = 10;
  page = 0;
  searchTerm: string = '';
  nbJourTravailSemaine: number = 0;
  nbJourTravailMois: number = 0;
  selectedEmployee: any;
  isModalVisible = false;
  constructor(private http: HttpClient,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getListEmployes().subscribe(
      (data) => {
        this.employes = data;
        this.updatePagedEmployes();
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des employes :', error);
      }
    );
  }

  getListEmployes(): Observable<any[]> {
    const url = environment.baseUrl + `/employe/lesEmployes`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.employes) {
          return response.employes;
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

  creerEmploye() {
    let heureDebutNum = parseFloat(this.horaireDebut);
    let heureFinNum = parseFloat(this.horaireFin);
    if (isNaN(heureDebutNum) || isNaN(heureFinNum)) {
      heureDebutNum=0;
      heureFinNum=0;
    }
    const bodyData = {
      nom: this.nom,
      email: this.email,
      horaireTravail: this.horaireDebut + ' - ' + this.horaireFin,
      heuredebut: heureDebutNum,
      heurefin: heureFinNum,
      nbJourTravailSemaine: this.nbJourTravailSemaine,
      nbJourTravailMois: this.nbJourTravailMois
    };
    this.http.post(environment.baseUrl + '/employe/create', bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status) {
          window.location.reload();
        } else {
          console.log("La création de l'employé a échoué.");
        }
      },
      (error) => {
        console.error("Erreur lors de la création de l'employé :", error); // Affichage de l'erreur renvoyée par le serveur
      }
    );
}


  deleteEmployee(employeeId: string) {
    this.http.delete(environment.baseUrl + `/employe/supprimer/${employeeId}`).subscribe(
      (response) => {
        console.log('Employé supprimé avec succès :', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.updatePagedEmployes();
  }

  updatePagedEmployes() {
    const filteredEmployes = this.employes.filter(employe =>
      employe.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = this.page * this.pageSize;
    this.pagedEmployes = filteredEmployes.slice(startIndex, startIndex + this.pageSize);
  }
  getEmployeById(employeeId: string): Observable<any[]> {
    const url = environment.baseUrl + `/employe/employebyId/${employeeId}`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response.status && response.employes) {
          return response.employes;
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
  openModal(employeeId: string, content: any): void {
    this.getEmployeById(employeeId).subscribe(
      (employee: any) => {
        this.selectedEmployee = employee; // Stocker toutes les informations de l'employé sélectionné
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); // Ouvrir le modal en utilisant NgbModal
        this.nom = this.selectedEmployee.nom;
        this.email = this.selectedEmployee.email;
        this.horaireDebut = this.selectedEmployee.heuredebut;
        this.horaireFin = this.selectedEmployee.heurefin;
        this.nbJourTravailSemaine = this.selectedEmployee.nbJourTravailSemaine;
        this.nbJourTravailMois = this.selectedEmployee.nbJourTravailMois;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'employé :', error);
      }
    );
  }

  updateEmploye(serviceId:string) {
    let heureDebutNum = parseFloat(this.horaireDebut);
    let heureFinNum = parseFloat(this.horaireFin);
    if (isNaN(heureDebutNum) || isNaN(heureFinNum)) {
      heureDebutNum=0;
      heureFinNum=0;
    }
    const url = environment.baseUrl+`/employe/employeupdate/${serviceId}`;
    const bodyData = {
      nom: this.nom,
      email: this.email,
      horaireTravail: this.horaireDebut + ' - ' + this.horaireFin,
      heuredebut: heureDebutNum,
      heureFin: heureFinNum,
      nbJourTravailSemaine: this.nbJourTravailSemaine,
      nbJourTravailMois: this.nbJourTravailMois
    };
    window.location.reload();
    this.http.patch<any>(url, bodyData).subscribe(
      (response) => {
        if (response.status && response.update) {

        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
      }
    );
  }
  closeModal(): void {
    this.isModalVisible = false;
  }
}
