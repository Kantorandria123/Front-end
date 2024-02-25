import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{
  services: any[] = [];
  nom: string="";
  description: string="";
  image: string="";
  prix: string="";
  duree: string="";
  commission: string="";
  strongMessage: string="";
  pageSize = 10;
  page = 0;
  pagedServices: any[] = [];
  searchTerm: string = '';
  imageFile: File | null = null;
  serviceId: string="";
  selectedService: any;
  isModalVisible = false;
  constructor(private router: Router,private http: HttpClient,private route: ActivatedRoute,private modalService: NgbModal){}


  ngOnInit(): void {
    this.getListService();
    this.serviceId = this.route.snapshot.paramMap.get('serviceId')!;
  }

  serviceCreate() {
    const formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('description', this.description);
    formData.append('prix', this.prix.toString());
    formData.append('duree', this.duree.toString());
    formData.append('commission', this.commission.toString());
    if (this.imageFile !== null) {
      formData.append('image', this.imageFile);
    }
    //window.location.reload();
    this.http.post<any>(environment.baseUrl + '/service/creer', formData).subscribe(
      (resultData) => {
        if (resultData.status) {
          this.strongMessage = "Service créé";
          window.location.reload();
        } else {
          this.strongMessage = "Service non créé";
        }
      },
      (error) => {
        console.error('Error creating service:', error);
      }
    );
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.imageFile = target.files[0];
    }
  }

  getListService() {
    const url = environment.baseUrl+'/service/lesservices';
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status && response.services) {
          this.services = response.services;
          this.updatePageServices();
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des services :', error);
      }
    );
  }
  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.updatePageServices();
  }
  updatePageServices() {
    const filteredServices = this.services.filter(service =>
      service.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = this.page * this.pageSize;
    this.pagedServices = filteredServices.slice(startIndex, startIndex + this.pageSize);
  }

  updateService(serviceId: string) {
    const url = environment.baseUrl+`/service/serviceupdate/${serviceId}`;
    const newData = {
      nom: this.nom,
      description: this.description,
      image: this.image,
      prix: this.prix,
      duree: this.duree,
      commission: this.commission,
    };
    window.location.reload();
    this.http.patch<any>(url, newData).subscribe(
      (response) => {
        if (response.status && response.updateService) {
          console.log("Service mis à jour avec succès :", response.updateService);
          window.location.reload();
        } else {
          console.error('Réponse inattendue du serveur :', response);
        }
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
      }
    );
  }

  deleteService(serviceId:string) {
    this.http.delete(environment.baseUrl + `/service/supprimer/${serviceId}`).subscribe(
      (response) => {
        console.log('Service supprimé avec succès :', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la suppression du service :', error);
      }
    )
  }

  getServiceById(serviceId: string): Observable<any[]> {
    const url = environment.baseUrl + `/service/servicesId/${serviceId}`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if(response.status && response.services) {
          return response.services;
        } else {
          console.error('Réponse inattendue du serveur :', response);
          return [];
        }
      }),
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la liste des services');
      })
    )
  }

  openModal(serviceId: string, content: any): void {
    this.getServiceById(serviceId).subscribe(
      (service: any) => {
        this.selectedService = service;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.nom = this.selectedService.nom;
        this.description = this.selectedService.description;
        this.image = this.selectedService.image;
        this.prix = this.selectedService.prix;
        this.duree = this.selectedService.duree;
        this.commission = this.selectedService.commission;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations du service :', error);
      }
    )
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

}
