import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affectatinprojet } from 'src/app/class/affectationprojet';
import { Affectationtache } from 'src/app/class/affectationtache';
import { Member } from 'src/app/class/member';
import { Phase } from 'src/app/class/phase';
import { Position } from 'src/app/class/position';
import { Projet } from 'src/app/class/projet';
import { Tache } from 'src/app/class/tache';
import { AffectatinprojetService } from 'src/app/services/affectatinprojet.service';
import { AffectationtacheService } from 'src/app/services/affectationtache.service';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import { ProjetService } from 'src/app/services/projet.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suivi-projet',
  templateUrl: './suivi-projet.component.html',
  styleUrls: ['./suivi-projet.component.css']
})
export class SuiviProjetComponent implements OnInit {
  idProjet:any;
  tache: Tache = new Tache();
  showButton = true;
  demarre=false;
  existing=false ;
  position!:Position[];
   projet: Projet = new Projet();
   member !:Member [];
   verificationmemberId !:Member;
   aidememberId !: Member;
   tutorMembers!: Member[];
   tuteurAcademique!:Member[];
   listpositionaide !:Position[];
   listpositionverif !:Position[];
   listpositionacad !:Position[];
   listpositionpro !:Position[];

   apprenantMembers!: Member[];
 affectationtuteur: Affectatinprojet=new Affectatinprojet();
 affectationtuteuracademique: Affectatinprojet=new Affectatinprojet();
 affectationapprenantverification: Affectatinprojet=new Affectatinprojet();
 affectationapprenantaide: Affectatinprojet=new Affectatinprojet();
 isTuteurProfessionnelPresent: boolean = false;
 p : Position =new Position();
 affectationapprenant: Affectationtache=new Affectationtache();
 phases!: Phase[];
 phase: Phase = {
   idPhase: 0,
   etat: null,
   PhaseTypes: [],
   description: null,
   status: null,
   dateDebut: null,
   dateFin: null,
   phases: []
 };
 disabledButton: boolean = false;

 
   selectedTutor!: number;
   selectedTuteurAcademique!: number;
   selectedApprenantaide!: number;
   selectedPosition!:number;
   selectedPositionn!:number;
   selectedPositionTuteurAcad !:number;
   selectedPositionTuteurPro !:number;

   selectedApprenant!: number;
   selectedApprenantverification ! : number;
   taches!: Tache[];
   //affectationTache : Affectationtache=new Affectationtache();
   affectationTaches: Affectationtache[]=[];
   affectationTachess: Affectationtache[]=[];
   membersprojet :Affectatinprojet[]=[];
    
   tachesnonaffectes !:Tache[];
 id:any;
 public showModal = false;
  nouveauNomTuteur: any;
  tuteurEnCoursDeModification: any;
 
   constructor(private positionService : PositionService,private projetService :ProjetService ,private tacheService:TacheService, private router: Router, private route: ActivatedRoute, private memberService:MemberService,  private activate: ActivatedRoute,private affectationProjetService:AffectatinprojetService,private affectationTacheService:AffectationtacheService) { }
   ngOnInit(): void { 
    this.getById();

    this.getMemberbyid();
this.getPositionApprenantMembersAide();
this.getPositionApprenantMembersVerif();
 this.getTutorMembers(); // list members tuteur pro
 this.getPositionTuteurPro(); //list position tuteur pro
 this.getApprenantMembers();
this.getTuteurAcademique(); //list  members tuteurs academiques
   this.getPositionTuteurAcad(); //list positions academiques
 this.afficherTaches(this.projet.idProjet); // les taches no affectees
 this.afficherPhases(this.projet.idProjet);
 //this.afficheraffectationTaches(this.projet.idProjet);

//this.affichertachesnonaffectes(this.projet.idProjet);
 
this.afficherMembersProjet(this.projet.idProjet);

}
savePosition(){
  console.log('mesaage',this.p);
  this.positionService.createPosition(this.p).subscribe(data=>{
    console.log('position ajoutée',data);

    Swal.fire("Position ajoutée avec succès",'','success');
    location.reload();

  },
  error => console.log(error));
}

openModal() {
 
 // this.position = new Position();

  // Récupérer le modal par son ID
  const modal = document.getElementById('myModal');

  // Afficher le modal
  if (modal) {
    modal.style.display = 'block';
  }
}
closeModal() {
  // Récupérer le modal par son ID
  const modal = document.getElementById('myModal');

  // Masquer le modal
  if (modal) {
    modal.style.display = 'none';
  }
}
getById() {
  this.id = this.activate.snapshot.params['id'];
  this.projetService.getProjetById(this.id).subscribe((d) => {
    this.projet = d;
    this.afficherTaches(d);
    this.afficherPhases(d);
    //this.affichertachesnonaffectes(d);
    this.afficheraffectationTaches(d);
    this.afficherMembersProjet(d)
  });
}
onchangetuteur($event:any){
  console.log("change",$event)
}
onchangeaprenant($event:any,idTache:any,index:number){
  console.log("change",$event)
  this.affectationTaches[index].memberId=$event;
 this.affectationTaches[index].projetId=this.projet.idProjet;

  //this.affectationTaches[index].member=$event;


}

  
  Affecter(): void {
   this.affectationtuteur.projetId=this.projet.idProjet;
   this.affectationapprenantverification.positionId=this.selectedPositionTuteurPro;


   this.affectationtuteur.memberId=this.selectedTutor;
   console.log('eeeeeeeeeeeeee',this.affectationtuteur);
   this.existing= true;

   this.affectationProjetService.ajouterAffectation(this.affectationtuteur).subscribe( data=> {

        this.affectationtuteur=data;
        console.log('rrrrrrrrrrr',data);

        Swal.fire("vous avez affecter le tuteur professionnel",'','success');
        location.reload();


        //  console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);

      });
    }
    Affectertuteuracademique() : void{

     this.affectationtuteuracademique.projetId=this.projet.idProjet;
     this.affectationapprenantverification.positionId=this.selectedPositionTuteurAcad;

     this.affectationtuteuracademique.memberId=this.selectedTuteurAcademique;
     console.log('affectation tuteur academique',this.affectationtuteuracademique);
     this.affectationProjetService.ajouterAffectationtuteuracademique
     (this.affectationtuteuracademique).subscribe( data=> {
  
          this.affectationtuteuracademique=data;
          console.log('tuteur academique',data);
          Swal.fire("vous avez affecter le tuteur academique",'','success');
  
          location.reload();

          //  console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);
  
        });
      }
      AffecterApprenantverification() : void{

       this.affectationapprenantverification.projetId=this.projet.idProjet;
       this.affectationapprenantverification.positionId=this.selectedPositionn;

       this.affectationapprenantverification.memberId=this.selectedApprenantverification;
       console.log('affectation apprenant verification',this.affectationapprenantverification);
       this.affectationProjetService.ajouterAffectationApprenantVerification
       (this.affectationapprenantverification).subscribe( data=> {
    
            this.affectationapprenantverification=data;
            console.log('apprenant verification',data);
            Swal.fire("vous avez affecter l 'apprenant verification",'','success');
            location.reload();

    
            //  console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);
    
          });
        }

        AffecterApprenantaide() : void{

         this.affectationapprenantaide.projetId=this.projet.idProjet;

         this.affectationapprenantaide.memberId=this.selectedApprenantaide;
         this.affectationapprenantaide.positionId=this.selectedPosition;
         console.log('affectation apprenant verification',this.affectationapprenantaide);
         this.affectationProjetService.ajouterAffectationApprenantDaide
         (this.affectationapprenantaide).subscribe( data=> {
      
              this.affectationapprenantaide=data;
              console.log('apprenant daide',data);
              Swal.fire("vous avez affecter l 'apprenant d aide ",'','success');
      
              location.reload();

              //  console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);
      
            });
          }
          Affecterr(idTache: any,index:number): void {
            //  this.projetService.getProjetById(this.idProjet);
         
               this.tacheService.getTacheById(idTache).subscribe(tache => {
                 this.affectationapprenant.tacheId = tache.idTache;
                 this.affectationapprenant.projetId = this.projet.idProjet;
         
                 this.affectationapprenant.memberId = this.selectedApprenant;
                 //this.projetService.getProjetById(idProjet).subscribe(p=>={
                 ///  this.affectationapprenant.projetId = this.projet.idProjet;
         
         
             
                 console.log('apprenant', this.affectationTaches[index]);
             
                 this.affectationTacheService.ajouterAffectation(this.affectationTaches[index]).subscribe(data => {
                 
                   this.affectationapprenant = data;
                   console.log('rrrrrrrrrrr', data);
                 //  const nomApprenant = this.apprenantMembers.find(apprenant => apprenant.memberId === this.selectedApprenant)?.firstName;
         
                   Swal.fire(`Vous avez affecté l'apprenant  pour cette tâche.`, '', 'success');
                   location.reload();
                 });
               });
             }
   // console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);
  
   afficherPhases(projet: Projet): void {
    this.projetService.getPhases(projet.idProjet)
      .subscribe(phases => this.phases = phases);
  }
  afficheraffectationTaches(projet: Projet): void { 
    
    this.projetService.getAfeectationTachesduProjet(projet.idProjet)
      .subscribe(affectationTachess => this.affectationTachess = affectationTachess);
      

  }
  afficherMembersProjet(projet: Projet): void { 
    
   this.projetService.getMembersduProjet(projet.idProjet)
     .subscribe(membersprojet => this.membersprojet = membersprojet);
     

 }
 
 /* affichertachesnonaffectes(projet: Projet): void {
    
    this.projetService.getTachenonAffectessDuProjet(projet.idProjet)
      .subscribe(tachesnonaffectes => this.tachesnonaffectes = tachesnonaffectes);
  }*/
  getTutorMembers(): void {
   // this.memberService.getTutorMembers()
   this.memberService.getPositionmemberbycode('PRO').subscribe(members => {this.tutorMembers = members
        console.log("Member=",members)
       } );
      }
      getPositionApprenantMembersAide(): void {
        // this.memberService.getTutorMembers()
        this.memberService.getPositionmemberapprenantAide().subscribe(positions => {this.listpositionaide = positions
             console.log("Positions=",positions)
            } );
           }
           getPositionTuteurAcad(): void {
            // this.memberService.getTutorMembers()
            this.memberService.getPositionmembertuteur('ACAD').subscribe(positions => {this.listpositionacad = positions
                 console.log("Positionsacad=",positions)
                } );
               }
               getPositionTuteurPro(): void {
                // this.memberService.getTutorMembers()
                this.memberService.getPositionmembertuteur('PRO').subscribe(positions => {this.listpositionpro = positions
                     console.log("Positionspro=",positions)
                    } );
                   }

           getPositionApprenantMembersVerif(): void {
            // this.memberService.getTutorMembers()
            this.memberService.getPositionmemberapprenantVerif().subscribe(positions => {this.listpositionverif = positions
                 console.log("Positions=",positions)
                } );
               }
      getTuteurAcademique(): void {
     //  this.memberService.getTuteurAcademique()
     this.memberService.getPositionmemberbycode('ACAD').subscribe(members => {this.tuteurAcademique = members
           console.log("Memberacadeique=",members)
          } );
         }
      getMemberbyid(): void {
        this.memberService.getMemberById(this.id).subscribe((d) => {
          this.member = [d];
        });
      }
      getMemberName(memberId: any) {
        const member = this.apprenantMembers.find(member => member.memberId === memberId);
        return member ? member.firstName : '';
      }
  getApprenantMembers(): void {
  //  this.memberService.getApprenantMembers()
  this.memberService.getPositionmemberbycode('APP').subscribe(members =>{ this.apprenantMembers = members
        console.log("Member=",members)});
  }
  afficherTaches(projet: Projet): void {
    this.affectationTaches=[];
    this.taches=[];
    this.projetService.getTachenonAffectessDuProjet(projet.idProjet)
      .subscribe(taches =>{ this.taches = taches
        console.log("Taches=",taches)
        for(var t of taches){
          var affectationTaches = new Affectationtache ();
          affectationTaches.tache=t;
          affectationTaches.tacheId=t.idTache;
                    this.affectationTaches.push(affectationTaches);


        }

       } );
  }
  updateTache(idTache:any){
    this.router.navigate(['update-tache', idTache]);
  
   }
   suivant(idProjet: any): void {
    // const projet= this.projets.find(p => p.idProjet === idProjet);
     //projet.demarre = true;
    //this.demarre = true;
  
   
     this.projetService.affecterdeuxiemePhaseProjet(idProjet).subscribe(data => {
       Swal.fire("le projet est dans la deuxieme phase planning  ",'','success');
   
       location.reload();

   
     });
   }
   suivant2(idProjet: any): void {
    // const projet= this.projets.find(p => p.idProjet === idProjet);
     //projet.demarre = true;
    //this.demarre = true;
  
   
     this.projetService.affectertroixiemePhaseProjet(idProjet).subscribe(data => {
       Swal.fire("le projet est dans la troixieme phase realisation  ",'','success');
       location.reload();

  
   
     });
   }
   lancer(idProjet:any){
     // const projet= this.projets.find(p => p.idProjet === idProjet);
   //projet.demarre = true;
  this.demarre = true;
  this.showButton = false;

 
  this.projetService.affecterPhaseProjet(idProjet).subscribe(data => {
    Swal.fire("le projet est dans la phase de Initialisation ",'','success');

    // On cache le bouton "Ajouter une phase"
  this.showButton = false;

  // On rafraîchit la page
  location.reload();

   
});
}
   suivant3(idProjet: any): void {
    // const projet= this.projets.find(p => p.idProjet === idProjet);
     //projet.demarre = true;
    //this.demarre = true;
  
   
     this.projetService.affecterquateriemePhaseProjet(idProjet).subscribe(data => {
       Swal.fire("le projet est dans la troixieme phase evaluate  ",'','success');
   
       location.reload();

   
     });
   }
   suivant4(idProjet: any): void {
    // const projet= this.projets.find(p => p.idProjet === idProjet);
     //projet.demarre = true;
    //this.demarre = true;
  
   
     this.projetService.affecterdernierPhaseProjet(idProjet).subscribe(data => {
       Swal.fire("le projet est dans la dernier phase   ",'','success');
   
       location.reload();


   
     });
   }
   terminer(idProjet:any):void{
    this.projetService.terminerDernierePhaseee(idProjet).subscribe(data => {
      Swal.fire("le projet est terminer  ",'','success');
  
      location.reload();
   });

  }
  isTutorProfessionnelAssigned(): boolean {
    const countTuteurpro = this.membersprojet.filter(affectationprojet => affectationprojet.positionId === 3).length;
    return countTuteurpro >= 1;
  // return this.membersprojet.some((affectationprojet) => affectationprojet.positionId=== "Tuteur Professionnel");
 }
 isTutorAcademiqueAssigned(): boolean {
  const countTuteuracademique = this.membersprojet.filter(affectationprojet => affectationprojet.positionId=== 1).length;
   return countTuteuracademique >= 1;
}
 isTutorApprenantdaideAssigned(): boolean {
  const countApprenantAide = this.membersprojet.filter(affectationprojet => affectationprojet.positionId != (1 && 3)).length;
  return countApprenantAide >= 10;
 }
 isTutorApprenantverificationAssigned(): boolean {
  const countApprenantVerif= this.membersprojet.filter(affectationprojet => affectationprojet.positionId!= (1 && 3)).length;
  return countApprenantVerif >= 10;

 }
 

 
}