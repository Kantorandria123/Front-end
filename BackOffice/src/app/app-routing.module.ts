import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProfilEmployeeComponent } from './profil-employee/profil-employee.component';
import { SuivisTacheComponent } from './suivis-tache/suivis-tache.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ServiceComponent } from './service/service.component';
import { DepenseComponent } from './depense/depense.component';
import { StatistiqueComponent } from './statistique/statistique.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'employee',
    component: ProfilEmployeeComponent
  },
  {
    path: 'suivistache',
    component: SuivisTacheComponent
  },
  {
    path:'personnel',
    component: PersonnelComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'depense',
    component: DepenseComponent
  },
  {
    path: 'statistique',
    component: StatistiqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }