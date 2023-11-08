import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours } from '../class/cours';
import { ProjetService } from '../services/projet.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-cours-par-membre',
  templateUrl: './list-cours-par-membre.component.html',
  styleUrls: ['./list-cours-par-membre.component.css']
})
export class ListCoursParMembreComponent implements OnInit {
  listCoursParMembre!: Cours[];
  searchDescription: string = '';
  courseRatings: { [key: number]: number } = {};
  totalItems: any; 
  page = 1;
  itemsPerPage = 2;
  cours: any[] = [];
  memberId = this.ac.snapshot.params['id'];
  totalCours: number = 0;
  rating!: number;
  constructor(private coursService: ProjetService, private ac: ActivatedRoute) { }


  ngOnInit(): void {
    
      this.getCoursListParMembre(this.page, this.itemsPerPage);
    
  }

  getCoursListParMembre(page: any, itemsPerPage: any) {
    this.coursService.getCoursListParMembre(page, itemsPerPage,this.memberId).subscribe((data: any) => {
      this.cours = data;
      this.listCoursParMembre = this.cours;
      this.totalItems = data.totalCours;
      
    if (this.searchDescription !== '') {
      this.listCoursParMembre = this.listCoursParMembre.filter((cours: Cours) =>
        cours.nom.toLowerCase().includes(this.searchDescription.toLowerCase())
      );
    }
      
    });
  }
  rateCourse(courseId: number, rating: number) {
    this.coursService.rateCourse(courseId, rating)
      .then(() => {
        // Succès de l'appel API
      })
      .catch(error => {
        // Gérer l'erreur de l'appel API
      });
  }
  
  
  
 
}
