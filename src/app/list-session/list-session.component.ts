import { Component, ElementRef, OnInit } from '@angular/core';

//import 'flatpickr/dist/flatpickr.min.css';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Cours } from '../class/cours';
import { Seance } from '../class/seance';
import { Session } from '../class/session';
import { GetCorsService } from '../services/get-cors.service';
//import flatpickr from 'flatpickr';
//import 'flatpickr/dist/flatpickr.css';
import { Inscription } from '../class/inscription';
import { Member } from '../class/member';
import { MemberService } from '../services/member.service';
//import { CalendarOptions } from '@fullcalendar/core';

//import 'flatpickr/dist/flatpickr.css';



@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*', display: 'block'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
    ])
  ]
})
export class ListSessionComponent implements OnInit {
  sessions: Session[] = [];
cours!:Cours;
  listCours: Cours[] = [];
  selectedSession: Session | undefined;
  coursSelectionne!: Cours  ;
  showModal = false;
  nouvelleSeance: Seance = new Seance;
  showAjoutSeanceModal = false;
  membres!:Member[];
  showInscriptionModal = false;
  membreSelectionne!: Member;
  inscription:Inscription=new Inscription;
  noninscrit:boolean=true;
  sature:boolean=false;
  membreConnecte!:Member;
  //calendarOptions!: CalendarOptions;
  
  constructor(private getcoursService: GetCorsService,
    private memberservice :MemberService,
    private elementRef: ElementRef) { }
    

  ngOnInit(): void {
    
    this.getcoursService.getSessions().subscribe((sessions) => {
      this.sessions = sessions;
      console.log(this.sessions)
    });
    this.getcoursService.getCours().subscribe((data:any)=> this.listCours=data);
  this.coursSelectionne=new Cours();
 // this.memberservice.getMemberList().subscribe((data:any)=> this.membres=data);
 
/////////////////////////////
setTimeout(() => {
  const calendarElement = this.elementRef.nativeElement.querySelector('#calendar');

  if (calendarElement) {
  /*  flatpickr(calendarElement, {
      // Configuration options for Flatpickr
    });*/

    // Iterate over the sessions and add events to the calendar
    this.sessions.forEach(session => {
      session.seances.forEach(seance => {
        const event = {
          title: 'Séance',
          start: seance.dateDebut,
          url: seance.lienGoogleMeet
        };

        calendarElement._flatpickr.addEvent(event);
      });
    });
  }
});

}
  


  ////////
  openModal(session: Session) {
    this.selectedSession = session;
    this.showModal = true;
  }

  

  closeModal() {
    this.selectedSession = undefined;
    //this.coursSelectionne = undefined;
    this.showModal = false;
  }

  /*affecterCours() {
    if (this.selectedSession && this.coursSelectionne) {
      const idSession = this.selectedSession.idSession;
      const idCours = this.coursSelectionne;
      this.getcoursService.ajouterCoursAuSession(idSession, idCours).subscribe(() => {
        
        this.getcoursService.getSessions().subscribe((sessions) => {
          this.sessions = sessions;
          this.closeModal();
        });
      });
    }
  }*/
  affecterCours(){
  if (this.selectedSession && this.coursSelectionne) {
    const idSession = this.selectedSession.idSession;
    const idCours = this.coursSelectionne.idCours;
    console.log("coursSelectionne",this.coursSelectionne)
    console.log("idcours",idCours)
    console.log("idSession",idSession)
    if (idCours) {
      this.getcoursService.ajouterCoursAuSession(idSession, idCours).subscribe(() => {
        this.getcoursService.getSessions().subscribe((sessions) => {
          this.sessions = sessions;
          console.log("les cours",this.selectedSession?.courss)
          this.closeModal();
        });
      });
    }
  }
  }


  openAjoutSeanceModal(session: Session) {
    this.selectedSession = session;
    this.showAjoutSeanceModal = true;
  }
  closeModalSeance(){
    this.showAjoutSeanceModal=false;
  }
 /*ajouterSeance() {
    this.getcoursService.postSeance(this.nouvelleSeance)
      .subscribe(
        response => {
          // Réussite de l'ajout de la séance, effectuer les actions appropriées
          console.log('Séance ajoutée avec succès');
          // Réinitialiser le formulaire
          this.nouvelleSeance = this.nouvelleSeance;
        },
        error => {
          // Erreur lors de l'ajout de la séance, gérer l'erreur appropriée
          console.error('Erreur lors de l\'ajout de la séance', error);
        }
      );
      
  }*/
  /*ajouterSeance() {
    this.getcoursService.postSeance(this.nouvelleSeance).pipe(
      switchMap((response: any) => {
        // Réussite de l'ajout de la séance, effectuer les actions appropriées
        console.log('Séance ajoutée avec succès');
        // Réinitialiser le formulaire
        this.nouvelleSeance = this.nouvelleSeance;
  
        // Appeler le deuxième service pour obtenir le lien Google Meet
        return this.getcoursService.postSeance(response);
      })
    ).subscribe(
      (response: any) => {
        // Vérifier la structure de la réponse et accéder au lien Google Meet approprié
        if (response && response.lienGoogleMeet) {
          // Mettre à jour la propriété lienGoogleMeet de la session avec le lien reçu de l'API
          this.nouvelleSeance.lienGoogleMeet = response.lienGoogleMeet;
          
          // Fermer le modal d'ajout de séance
          this.showAjoutSeanceModal = false;
        } else {
          // Gérer le cas où le lien Google Meet n'est pas présent dans la réponse
          console.error('Le lien Google Meet est introuvable dans la réponse de l\'API.');
        }
      },
      error => {
        // Erreur lors de l'ajout de la séance ou de l'obtention du lien Google Meet, gérer l'erreur appropriée
        console.error('Erreur lors de l\'ajout de la séance ou de l\'obtention du lien Google Meet', error);
      }
    );
  } */
  ajouterSeance() {
    if (this.selectedSession) {
      console.log("séances",this.selectedSession.seances)
      this.nouvelleSeance.idSession = this.selectedSession.idSession;
    }
    this.getcoursService.postSeance(this.nouvelleSeance).subscribe(
      (response: any) => {
        // Réussite de l'ajout de la séance, effectuer les actions appropriées
        console.log('Séance ajoutée avec succès');
        // Réinitialiser le formulaire
        
       
        console.log("idSession",this.nouvelleSeance.idSession)
        this.nouvelleSeance = new Seance();
  
        // Vérifier la structure de la réponse et accéder au lien Google Meet approprié
        if (response && response.data && response.data.lienGoogleMeet) {
          // Mettre à jour la propriété lienGoogleMeet de la séance avec le lien reçu de l'API
          this.nouvelleSeance.lienGoogleMeet = response.data.lienGoogleMeet;
  
          // Fermer le modal d'ajout de séance
          this.showAjoutSeanceModal = false;
        } else {
          // Gérer le cas où le lien Google Meet n'est pas présent dans la réponse
          console.error('Le lien Google Meet est introuvable dans la réponse de l\'API.');
        }
      },
      error => {
        // Erreur lors de l'ajout de la séance, gérer l'erreur appropriée
        console.error('Erreur lors de l\'ajout de la séance', error);
      }
    );
  }



  openInscriptionModal(session: any) {
    this.selectedSession = session;
    this.showInscriptionModal = true;
  }
  closeModalInscription() {
    this.showInscriptionModal = false;
  
  }

  payer() {
    
    console.log('Paiement effectué');
    
    this.closeModalInscription();
  }
  sinscrire() {
    if (this.selectedSession) {
    this.inscription.idSession = this.selectedSession.idSession;}
    if(this.selectedSession?.capacite != 0){
    this.getcoursService.postInscription(this.inscription).subscribe((response) => {
      ////////
      console.log('Inscription effectuée :', response);
      //this.membreConnecte=this.memberservice.getById(1);
      localStorage.setItem('member', JSON.stringify(Member));
      /////////
      const to='wissem.jerbi@esprit.tn';
      const subject='succès de votre inscription'
      const body = `<html>
      <body>
        <h1>Félicitations, vous êtes inscrit à cette session de ${this.selectedSession?.dateDebut}.</h1>
        <p>Vous allez recevoir des e-mails détaillant la date et l'heure de chaque séance.</p>
      </body>
    </html>`;

      this.getcoursService.sendEmail(to, subject, body).subscribe();
      if (this.selectedSession) {
        for (const seance of this.selectedSession.seances) {
          const to = 'wissem.jerbi@esprit.tn';
          const subject = `Invitation pour la séance`;
          const body = `
            <html>
              <body>
                <h1>Vous etes invité pour cette séances</h1>
                <p>La séance aura lieu le ${seance.dateDebut} à ${seance.heureReunion}.</p>
                <p>Veuillez vous préparer et arriver à l'heure.</p>
                <p>Vous pouvez rejoindre la séance via ce lien ${seance.lienGoogleMeet} </p>
              </body>
            </html>
          `;
          this.getcoursService.sendEmail(to, subject, body).subscribe();
        }
      }
      this.getcoursService.getSessions().subscribe((sessions) => {
        this.sessions = sessions;
        console.log(this.sessions)
      });
      this.noninscrit=false;
      /////
      this.closeModalInscription();
    });
  }else{this.sature=true}
  }

  ///////
  getEvents(): any[] {
    const events: any[] = [];

    
    if (this.selectedSession) {
      
      for (const seance of this.selectedSession?.seances) {
        const event = {
          title: `Séance ${seance.dateDebut}`,
          start: seance.dateDebut,
          
        };

        events.push(event);
      }
    }

    return events;
  }
}

