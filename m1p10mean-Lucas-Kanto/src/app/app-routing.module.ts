import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
