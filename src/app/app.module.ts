import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjoutCoursComponent } from './components/ajout-cours/ajout-cours.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProjetComponent } from './components/projet/projet.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjoutSessionComponent } from './ajout-session/ajout-session.component';
import { AviCoursComponent } from './avi-cours/avi-cours.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { AddPublicationComponent } from './components/add-publication/add-publication.component';
import { AddTacheComponent } from './components/add-tache/add-tache.component';
import { ControlProjetComponent } from './components/control-projet/control-projet.component';
import { CreateProjetComponent } from './components/create-projet/create-projet.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemandeAideComponent } from './components/demande-aide/demande-aide.component';
import { DetailProjetComponent } from './components/detail-projet/detail-projet.component';
import { ForumComponent } from './components/forum/forum.component';
import { ListActivityComponent } from './components/list-activity/list-activity.component';
import { ListTacheComponent } from './components/list-tache/list-tache.component';
import { ListeCoursComponent } from './components/liste-cours/liste-cours.component';
import { AddMembreComponent } from './components/membre/add-membre/add-membre.component';
import { ListMembresComponent } from './components/membre/list-membres/list-membres.component';
import { MembreComponent } from './components/membre/membre.component';
import { NotificationComponent } from './components/membre/notification/notification.component';
import { ProfileMemberComponent } from './components/membre/profile-member/profile-member.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
import { CartDetailsComponent } from './components/payment/cart-details/cart-details.component';
import { CartStatusComponent } from './components/payment/cart-status/cart-status.component';
import { CheckoutComponent } from './components/payment/checkout/checkout.component';
import { ListPaymentParMembreComponent } from './components/payment/list-payment-par-membre/list-payment-par-membre.component';
import { ListePaiementsComponent } from './components/payment/liste-paiements/liste-paiements.component';
import { SuccessComponent } from './components/payment/success/success.component';
import { ListProjetParMembreComponent } from './components/projet/list-projet-par-membre/list-projet-par-membre.component';
import { SuiviProjetComponent } from './components/suivi-projet/suivi-projet.component';
import { SuiviTacheComponent } from './components/suivi-tache/suivi-tache.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { UpdateProblemeComponent } from './components/update-probleme/update-probleme.component';
import { UpdateProjetComponent } from './components/update-projet/update-projet.component';
import { UpdateTacheComponent } from './components/update-tache/update-tache.component';
import { DashboardProjetComponent } from './dashboard-projet/dashboard-projet.component';
import { ListCoursParMembreComponent } from './list-cours-par-membre/list-cours-par-membre.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListSessionComponent } from './list-session/list-session.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartService } from './services/cart.service';
import { CoursService } from './services/cours.service';
import { PaymentService } from './services/payment.service';
import { ProjetService } from './services/projet.service';
import { AuthInterceptor } from './utility/auth.interceptor';

import { EvaluationPopupComponent } from './evaluation-popup/evaluation-popup.component';


import { RxStompService } from '@stomp/ng2-stompjs';


import { AddNotificationComponent } from './add-notification/add-notification.component';
import { ParametrageComponent } from './parametrage/parametrage.component';

import { CatalogueComponent } from './catalogue/catalogue.component';

import { CommonModule } from '@angular/common';


import { AddUserComponent } from './add-user/add-user.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { NotreChatbotComponent } from './components/notre-chatbot/notre-chatbot.component';

import { DetailsCoursComponent } from './details-cours/details-cours.component';

import { RoleComponent } from './role/role.component';
import { MrBotComponent } from './components/mr-bot/mr-bot.component';
import { MonProfilComponent } from './components/membre/mon-profil/mon-profil.component';
import { UpdateMemberComponent } from './components/membre/update-member/update-member.component';
import { ListPositionComponent } from './components/membre/list-position/list-position.component';
import { AddPositionComponent } from './components/membre/add-position/add-position.component';
import { UpdatePositionComponent } from './components/membre/update-position/update-position.component';

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'KeyClock-INSY2S-E-LEARING',
        clientId: 'E_Learning',
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,
      },
    });
}



@NgModule({
  declarations: [
    
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PaymentComponent,
    AjoutCoursComponent,
    ProjetComponent,
    CreateProjetComponent,
    ListCoursComponent,
    AviCoursComponent,
    UpdateProjetComponent,
    DetailProjetComponent,
    ListActivityComponent,
    AddActivityComponent,
    UpdateActivityComponent,
    
    AddTacheComponent,
    ListTacheComponent,
    UpdateTacheComponent,
    ControlProjetComponent,
    AjoutSessionComponent,
    ListSessionComponent,
    CartDetailsComponent,
    CartStatusComponent,
    CheckoutComponent,
    MembreComponent,
    ListMembresComponent,
    AddMembreComponent,
    ListeCoursComponent,
    ProfileMemberComponent,
    CustomerSupportComponent,

    SuiviProjetComponent,
    UpdateProblemeComponent,
    DashboardComponent,
    LoginComponent,
    CancelComponent,
    SuccessComponent,
    RegisterComponent,
    ForumComponent,
    AddPublicationComponent,
    NotificationComponent,
    ListePaiementsComponent,
    ListPaymentParMembreComponent,
    SuiviTacheComponent,
    DemandeAideComponent,
    ListProjetParMembreComponent,
    DashboardProjetComponent,
    ListCoursParMembreComponent,
  
    EvaluationPopupComponent,
   
   
    AddNotificationComponent,
    ParametrageComponent,

    CatalogueComponent,

    RoleComponent,
    AddUserComponent,
    AdminProfileComponent,
    NotreChatbotComponent,
    DetailsCoursComponent,
    MrBotComponent,
    MonProfilComponent,
    UpdateMemberComponent,
    ListPositionComponent,
    AddPositionComponent,
    UpdatePositionComponent,
    

  ],
  imports: [
    SocketIoModule.forRoot(config), 
    MatDialogModule,
    FormsModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    BrowserModule,
    NgbToastModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    NgxPaginationModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [
     {
      
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
   
    RxStompService,
    CoursService,
    PaymentService,
    ProjetService,
    CartService,
    FormsModule,
    ProjetComponent,
    HttpClientModule,
    ChartsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
