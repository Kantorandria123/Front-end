import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';3
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { HistoriqueRDVComponent } from './historique-rdv/historique-rdv.component';
import { ProfilClientComponent } from './profil-client/profil-client.component';
import { EmployeeComponent } from './employee/employee.component';
import { PreferenceComponent } from './preference/preference.component';
import { PaiementComponent } from './paiement/paiement.component';
import { DateFormatPipe } from './date-format.pipe';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InscriptionComponent,
    RendezvousComponent,
    HistoriqueRDVComponent,
    ProfilClientComponent,
    EmployeeComponent,
    PreferenceComponent,
    PaiementComponent,
    DateFormatPipe,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

