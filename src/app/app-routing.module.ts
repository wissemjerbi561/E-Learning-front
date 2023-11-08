import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AjoutSessionComponent } from './ajout-session/ajout-session.component';
import { AviCoursComponent } from './avi-cours/avi-cours.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { AddTacheComponent } from './components/add-tache/add-tache.component';
import { AjoutCoursComponent } from './components/ajout-cours/ajout-cours.component';
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
import { NotificationComponent } from './components/membre/notification/notification.component';
import { ProfileMemberComponent } from './components/membre/profile-member/profile-member.component';
import { NotreChatbotComponent } from './components/notre-chatbot/notre-chatbot.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
import { CartDetailsComponent } from './components/payment/cart-details/cart-details.component';
import { CheckoutComponent } from './components/payment/checkout/checkout.component';
import { ListPaymentParMembreComponent } from './components/payment/list-payment-par-membre/list-payment-par-membre.component';
import { ListePaiementsComponent } from './components/payment/liste-paiements/liste-paiements.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SuccessComponent } from './components/payment/success/success.component';
import { ProjetComponent } from './components/projet/projet.component';
import { SuiviProjetComponent } from './components/suivi-projet/suivi-projet.component';
import { SuiviTacheComponent } from './components/suivi-tache/suivi-tache.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { UpdateProblemeComponent } from './components/update-probleme/update-probleme.component';
import { UpdateProjetComponent } from './components/update-projet/update-projet.component';
import { UpdateTacheComponent } from './components/update-tache/update-tache.component';
import { EvaluationPopupComponent } from './evaluation-popup/evaluation-popup.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListSessionComponent } from './list-session/list-session.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utility/app.guard';
import { ParametrageComponent } from './parametrage/parametrage.component';

import { CatalogueComponent } from './catalogue/catalogue.component';

import { RegisterComponent } from './register/register.component';
import { RoleComponent } from './role/role.component';
import { HomeComponent } from './shared/home/home.component';
import { DetailsCoursComponent } from './details-cours/details-cours.component';
import { MrBotComponent } from './components/mr-bot/mr-bot.component';
import { MonProfilComponent } from './components/membre/mon-profil/mon-profil.component';
import { UpdateMemberComponent } from './components/membre/update-member/update-member.component';
import { ListPositionComponent } from './components/membre/list-position/list-position.component';
import { AddPositionComponent } from './components/membre/add-position/add-position.component';
import { UpdatePositionComponent } from './components/membre/update-position/update-position.component';





const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'update-position',
    component: UpdatePositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-position',
    component: AddPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-position',
    component: ListPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-member/:memberId',
    component: UpdateMemberComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'mon-profil',
    component: MonProfilComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'mr-bot',
    component: MrBotComponent,
    canActivate: [AuthGuard],
  },
 
  {
    path: 'notre-chatbot',
    component: NotreChatbotComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'register',
    component: RegisterComponent /*canActivate:[AuthGuard]*/,
  },

  { path: 'createRole', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/profile/:id',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addnotification',
    component: AddNotificationComponent,
    canActivate: [AuthGuard],
  },

   {
     path: 'membres',
     component: ListMembresComponent,
     canActivate: [AuthGuard],
   },
   {
     path: 'ajout-membre',
     component: AddMembreComponent,
     //canActivate: [AuthGuard],
   },
   {
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [AuthGuard],
  },
   {
     path: 'membres/:id',
     component: ProfileMemberComponent,
     canActivate: [AuthGuard],
   },
   {
     path: 'customer-support',
     component: CustomerSupportComponent,
     canActivate: [AuthGuard],
   },

  {
    path: 'membres',
    component: ListMembresComponent,
    canActivate: [AuthGuard],
  },
  
  
  {
    path: 'ajout-membre',
    component: AddMembreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'membres/:id',
    component: ProfileMemberComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-support',
    component: CustomerSupportComponent,
    canActivate: [AuthGuard],
  },


  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'cours', component: ListeCoursComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'detailscours', component: DetailsCoursComponent },
  { path: 'cancel', component: CancelComponent, canActivate: [AuthGuard] },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
  {
    path: 'paymentListAdmin',
    component: ListePaiementsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paymentListMembre',
    component: ListPaymentParMembreComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'cart-details',
    component: CartDetailsComponent,
    canActivate: [AuthGuard],
  },
  //{path:'**',redirectTo:'/cours',pathMatch:'full'}

  { path: 'projets', component: ProjetComponent, canActivate: [AuthGuard] },
  {
    path: 'createprojet',
    component: CreateProjetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-projet/:id',
    component: UpdateProjetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'parametrage',
    component: ParametrageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DetailProjetComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'list-activity/:id',
    component: ListActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-activity/:id',
    component: AddActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-activity/:id',
    component: UpdateActivityComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'add-tache/:id',
    component: AddTacheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-tache/:id',
    component: ListTacheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-tache/:id',
    component: UpdateTacheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-probleme/:id',
    component: UpdateProblemeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'controle',
    component: ControlProjetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suivi/:id',
    component: SuiviProjetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'suiviTache',
    component: SuiviTacheComponent,
    canActivate: [AuthGuard],
  },

  /*{ path: 'update-projet/:id', component: UpdateProjetComponent },
  { path: 'detail/:id', component: DetailProjetComponent },
  */

  {
    path: 'forum',
    component: ForumComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suivi/:id',
    component: SuiviProjetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  /*{ path: 'update-projet/:id', component: UpdateProjetComponent },
  { path: 'detail/:id', component: DetailProjetComponent },
  */
  {
    path: 'ajoutcours',
    component: AjoutCoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listcours',
    component: ListCoursComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ajoutAvi', component: AviCoursComponent, canActivate: [AuthGuard] },

  {
    path: 'ajoutSession',
    component: AjoutSessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'evaluation',
    component: EvaluationPopupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listSession',
    component: ListSessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'demandeAide',
    component: DemandeAideComponent,
    canActivate: [AuthGuard],
  },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
