import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/class/position';
import { PositionService } from 'src/app/services/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent {

  position =new Position();

  

  constructor(private positionService :PositionService,private activeRoute: ActivatedRoute,
    private router: Router) { }



    

  ngOnInit(): void {
    this.position=new Position()
    this.activeRoute.queryParams.subscribe((params:any) => {
      console.log(params.position)
      if(params.position){
          //this.memberService.getById(params.member);
          this.positionService.getPositionById(params.position).subscribe((data:any)=>{
            this.position = data;
            
            
          });
        
      }
    })



  }
  private redirectToListPositions() {
    this.router.navigate(['/list-position']);
  }
  savePosition(){
    console.log('mesaage',this.position);
    this.positionService.createPosition(this.position).subscribe(data=>{
      console.log('position ajoutée',data);

      Swal.fire("Position ajoutée avec succès",'','success');
      this.redirectToListPositions();
    },
    error => console.log(error));
  }













  savePositionn() {
    this.positionService.createPositionn(this.position)
      .subscribe(
        (response) => {
          console.log('Position saved successfully:', response);
          // Réinitialiser le formulaire après l'enregistrement réussi
          this.position = new Position();
        },
        (error) => {
          console.error('Error saving position:', error);
        }
      );
  }



}
