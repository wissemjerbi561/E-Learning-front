import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/class/member';
import { Projet } from 'src/app/class/projet';
import { MemberService } from 'src/app/services/member.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-control-projet',
  templateUrl: './control-projet.component.html',
  styleUrls: ['./control-projet.component.css']
})
export class ControlProjetComponent implements OnInit {
  projets!: Projet[];

  tutorMembers!: Member[];
  selectedTutor!: number;


  constructor(private projetService:ProjetService , private router:Router,private memberService:MemberService) { }

  ngOnInit(): void {
    this.allprojets();
    this.getTutorMembers();
  }
   
  
  getTutorMembers(): void {
    this.memberService.getTutorMembers()
      .subscribe(members => this.tutorMembers = members);
  }


  Affecter(idProjet: any): void {
    console.log("Tuteur professionnel affecté pour le projet ", idProjet, ": ", this.selectedTutor);
  }

  allprojets(){
    this.projetService.allProjets().subscribe(
     (d) => {
        //this.router.navigate(['Products'])
        this.projets=d;
        console.log(d);
       // alert("f");
      }
    );
 }

 AffecterProjet(idProjet: any): void {
  
 }
 SuivieProjet(idProjet: any): void {
  
 }
 
}