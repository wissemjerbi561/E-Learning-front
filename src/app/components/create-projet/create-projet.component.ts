import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { Cours } from 'src/app/class/cours';
import { Projet } from 'src/app/class/projet';
import { Theme } from 'src/app/class/theme';
import { GetCorsService } from 'src/app/services/get-cors.service';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.css']
})
export class CreateProjetComponent implements OnInit {
  probelems:any;
  projet: Projet = {
    idProjet: 0,
    description: '',
    dateDebut: null,
    dateFin: null,
    cours: new Cours,
    problemes: [],
    status: null,
    phases: [],
    demarre: false,
    memberId: 0,
    name: '',
    theme : new Theme,
            themeId:''

  };
  //idCours:any = Cours;
  //selected!:Cours;
  coursList!: Cours[];
  listtheme!:Theme[];
  constructor(private coursService: GetCorsService,
    private projetService: ProjetService , private router:Router ) { }

ngOnInit(): void {
this.listcours();
this.themelist();
}

listcours(){
  this.coursService.getCours().subscribe((data:any) => {
    this.coursList = data;
    });
}
themelist(){
this.coursService.getThemes().subscribe((data:any) => {
  this.listtheme = data;
  });
}
onSubmit() {
  const idCours = this.projet.cours.idCours;
  const themeId =this.projet.theme.idTheme;
  this.projetService.ajouterProjet(this.projet, idCours)
    .subscribe(() => {
      console.log('Projet ajouté avec succès');
      Swal.fire("Projet ajouté avec succès",'','success');

      this.router.navigate(['/projets']);
      this.projet = {
        idProjet:0 ,
        name:'',
        description: '',
        dateDebut: null,
        dateFin: null,
        demarre: false,
        cours:new Cours,
        problemes: [], 
        status: null , 
        phases :[],
        memberId: 0 , 
        theme : new Theme,
        themeId:''

        
      //  problemes: new Probleme,
       // probeleme:new Probleme
    };
    });
}
}