import { Component, OnInit } from "@angular/core";
import { Modal } from 'bootstrap';
import { Categorie } from "src/app/class/categorie";
import { Chapitre } from "src/app/class/chapitre";
import { Cours } from "src/app/class/cours";
import { Session } from "src/app/class/session";
import { SousCategorie } from "src/app/class/sousCategorie";
import { Tarif } from "src/app/class/tarif";
import { Theme } from "src/app/class/theme";
import { GetCorsService } from "src/app/services/get-cors.service";



@Component({
  selector: 'app-ajout-cours',
  templateUrl: './ajout-cours.component.html',
  styleUrls: ['./ajout-cours.component.css']
})
export class AjoutCoursComponent implements OnInit {
cours!:Cours;
  listCours !:Cours[];
  ajoutChapitre: boolean = false;
  chapitre: Chapitre = new Chapitre();
  tarif:Tarif=new Tarif();
  session: Session=new Session();
  private chapitreModal!: Modal;
  public showModal = false;
  idCours: number | undefined;
  ajoutTheme: boolean = false;
  public showModalTheme = false;
  public showModalSession = false;
  theme:Theme=new Theme();
  listThemes!:Theme[];
  categorie: Categorie = new Categorie();
  sousCategorie!: SousCategorie ;
  
  listCategories: Categorie[] = [];
  listSousCategories: SousCategorie[] = [];
  
  showModalCategorie = false;
  showModalSousCategorie = false;
  nouvelleCategorie: Categorie = new Categorie();
  nouvelleSousCategorie: SousCategorie = new SousCategorie();
  ImageFile!: File;
  constructor(private getcoursService:GetCorsService) { }

  ngOnInit(): void {
    console.log()
    this.cours=new Cours();
    this.sousCategorie=new SousCategorie;
    this.getcoursService.getCours().subscribe((data:any)=> {this.listCours=data 
      console.log("cours=",data)});
  this.getcoursService.getThemes().subscribe((data:Theme[])=>{this.listThemes=data
  console.log("themes=",data)});
  this.getCategories();
    this.getSousCategories();
  
  }
 save(){
    this.getcoursService.postCours(this.cours).subscribe((data: any) => {
      this.idCours = data.idCours;
      console.log("cours=",data)

    });
    this.ajoutChapitre = true;
  } 
  
 /*  save() {
    if (this.cours && this.cours.ImageFile) {
      this.getcoursService.postCoursWithImage(this.cours, this.cours.ImageFile).subscribe(
        (response) => {
          // Gérer la réponse du serveur en cas de succès
          console.log('Cours enregistré avec succès', response);
  
          // Effectuer la navigation vers une autre page
          //this.router.navigate(['/autre-page']);
        },
        (error) => {
          // Gérer les erreurs de la requête
          console.error('Erreur lors de l\'enregistrement du cours', error);
        }
      );
    } else {
      console.error('Le cours ou le fichier image est manquant.');
    }
  } */
  saveChapitre(){
    this.getcoursService.postChapitre(this.chapitre).subscribe();
  }


  ajouterChapitre() {
    //this.getcoursService.postChapitre(this.chapitre).subscribe();

   console.log(this.idCours)
console.log(this.chapitre)
    this.getcoursService.postChapitre(this.chapitre).subscribe( data=> {
console.log(data)
      this.chapitre = new Chapitre();
      this.showModal = false;
    });
  }
  ajouterTarif(){
this.getcoursService.postTarif(this.tarif).subscribe(() => {


  this.showModalSession = false;
})
    

  }

  ajouterTheme(){
    this.getcoursService.postTheme(this.theme).subscribe();
    this.showModalTheme=false
  }
  public openModal(): void {
    this.getcoursService.getCours().subscribe((data:any)=> this.listCours=data);
    this.chapitre.idCours = this.idCours;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }
  openModalTheme(){ 
    this.showModalTheme=true;
  }
  openModalSession(){
    this.showModalSession=true;
    this.session = new Session();
  }
  onChangeCours($event:any) {
  console.log($event)
  }
  ajouterCategorie() {
    this.getcoursService.postCategorie(this.nouvelleCategorie).subscribe(response => {
      // Réinitialiser le formulaire de la catégorie
      this.nouvelleCategorie = new Categorie();
      // Fermer la modal
      this.showModalCategorie = false;
      // Mettre à jour la liste des catégories
      this.getCategories();
    });
  }

  // Méthode pour ajouter une sous-catégorie
  ajouterSousCategorie() {
    this.getcoursService.postSousCategorie(this.nouvelleSousCategorie).subscribe(response => {
      // Réinitialiser le formulaire de la sous-catégorie
      this.nouvelleSousCategorie = new SousCategorie();
      // Fermer la modal
      this.showModalSousCategorie = false;
      // Mettre à jour la liste des sous-catégories
      this.getSousCategories();
    });
  }
  getCategories() {
    this.getcoursService.getCategories().subscribe(categories => {
      this.listCategories = categories;
    });
  }

  // Méthode pour récupérer la liste des sous-catégories
  getSousCategories() {
    this.getcoursService.getSousCategories().subscribe(sousCategories => {
      this.listSousCategories = sousCategories;
    });
  }
  openModalCategorie() {
    this.showModalCategorie = true;
  }

  // Méthode pour ouvrir la modal d'ajout de sous-catégorie
  openModalSousCategorie() {
    this.showModalSousCategorie = true;
  }
  onImageFileChange(event: any) {
    const file = event.target.files[0];
    this.cours.ImageFile = file;
  }

}


