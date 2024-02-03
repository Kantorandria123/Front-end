import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { HistoriqueRDVComponent } from './historique-rdv/historique-rdv.component';
import { ProfilClientComponent } from './profil-client/profil-client.component';
import { EmployeeComponent } from './employee/employee.component';
import { PreferenceComponent } from './preference/preference.component';
import { PaiementComponent } from './paiement/paiement.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'rendezvous',
    component: RendezvousComponent
  },
  {
    path: 'historique',
    component: HistoriqueRDVComponent
  },
  {
    path: 'profil',
    component: ProfilClientComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path:'preference',
    component: PreferenceComponent
  },
  {
    path:'paiement',
    component: PaiementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
