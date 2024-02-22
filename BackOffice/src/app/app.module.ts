import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';3
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
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
import { DateFormatPipe } from './date-format.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DepotComponent } from './depot/depot.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfilEmployeeComponent,
    SuivisTacheComponent,
    PersonnelComponent,
    ServiceComponent,
    DepenseComponent,
    StatistiqueComponent,
    DateFormatPipe,
    DepotComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

