import { ViewportScroller } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categorie } from "../class/categorie";
import { Cours } from "../class/cours";
import { Session } from "../class/session";
import { Tarif } from "../class/tarif";
import { GetCorsService } from "../services/get-cors.service";


@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  
listCours !:Cours[];
  coursSelectionne: Cours = new Cours();
  courssupp!:any;
  tarif!: Tarif;
  showModalReplaceTarif = false;
  nouveauTarif: Tarif = new Tarif();
  sessions!: Session[];
  selectedSession!: Session;
  showModal = false;
  listCategories: Categorie[] = [];
  showDropdown: boolean = false;
  filteredCours!: Cours[];
  coursPlusnote!:Cours[];
  toutLesCoursHide:boolean=false;
  constructor(private coursServicee:GetCorsService,
  private viewportScroller: ViewportScroller,
  private http: HttpClient,
              public router: Router   ) { }

  ngOnInit(): void {
   // this.coursServicee.getCours().subscribe((data:any)=> this.listCours=data);
   this.coursServicee.getCours().subscribe((data: any) => {
    this.listCours = data;
    this.getCategories();

  });
    //this.coursServicee.getCategories().subscribe((data:any)=>this.listcategories=data);
    this.getCoursByNomCategorie('All');
    //this.listcategories=this.listcategories;
    console.log(this.listCategories);
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  navigateToCategory(categoryId: number) {
    // Effectuez la navigation vers la catégorie sélectionnée
    // en utilisant le Router d'Angular ou votre logique de navigation personnalisée.
  }
  getCategories() {
    this.coursServicee.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.listCategories = categories;
        console.log(this.listCategories);
        // Autres opérations qui dépendent des catégories
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
      }
    );
  }
  getCoursByNomCategorie(nomCategorie: string) {
    this.coursServicee.getCoursByNomCategorie(nomCategorie).subscribe(
      (cours) => {
        this.filteredCours = cours;
        console.log("liste feltred==",cours)
      },
      (error) => {
        // Handle error if necessary
      }
    );
  }


  voirDetails(cours: Cours) {
    this.coursSelectionne = cours;
    this.coursServicee.getTarifCourant(this.coursSelectionne.idCours).subscribe((tarif) => {
      this.tarif = tarif;
    });
//this.viewportScroller.scrollToAnchor('details-section');

this.router.navigate(['detailscours'], { queryParams: { idCours: this.coursSelectionne.idCours } });

  }
  openModalReplaceTarif() {
    this.nouveauTarif = new Tarif();
    this.nouveauTarif.idCours = this.coursSelectionne.idCours;
    this.showModalReplaceTarif = true;
  }
  
  fermerModalReplaceTarif() {
    this.showModalReplaceTarif = false;
  }
  coursDetails(idCours: number){
    this.router.navigate(['detailscours', idCours]);
  }
  remplacerTarif() {
    this.coursServicee.postTarif(this.nouveauTarif).subscribe((tarif) => {
      //this.tarif = tarif;
      this.fermerModalReplaceTarif();
    });
  }
  ////////////

  /*openModal() {
    this.coursServicee.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.showModal = true;
    });
  }

  closeModal() {
    this.showModal = false;
  }

  affecterCours() {
    this.coursServicee.ajouterCoursAuSession(this.selectedSession.idSession, this.coursSelectionne.idCours).subscribe(() => {
      this.closeModal();
    });
  }*/
  toavi(){
    console.log("coursSelectionne ",this.coursSelectionne )
    let route = '/ajoutAvi';

        this.router.navigate([route], { queryParams: { coursId: this.coursSelectionne.idCours ,
          coursNom: this.coursSelectionne.nom
        } });

  }
  

  
  getCoursLesPlusNotes(): void {
    this.coursServicee.getCoursByNoteMoyenneSatisfaction().subscribe(
      (cours: Cours[]) => {
        this.coursPlusnote = cours;
        this.toutLesCoursHide=true;
        
      },
      (error: any) => {
        
      }
    );
  }
  
  recherchertoutlescours(){
    this.toutLesCoursHide=false;
  }
  
  
  
  
  
  
  
  
  
  


  navigateToDetails(courseId: number) {
    this.router.navigate(['/detailscours', courseId]);
  }




}

