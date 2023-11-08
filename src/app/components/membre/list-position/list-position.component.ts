import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/class/position';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-position',
  templateUrl: './list-position.component.html',
  styleUrls: ['./list-position.component.css']
})
export class ListPositionComponent {

  positions:Position[] =[];
  listPositions: Position[]=[];
  
  

  constructor(private http: HttpClient,private memberService:MemberService,private route:ActivatedRoute,private router:Router,
    private positionService :PositionService) {}



  ngOnInit() {
    //this.getPositions();
    this.obtenirPositionsStatutFalse();
    
    /*this.route.paramMap.subscribe(() =>{
      this.listMembers();
      this.getPositions();
    });*/
    
    
  }
  obtenirPositionsStatutFalse(){
    this.positionService.obtenirPositionsStatusFalse().subscribe ((data) => {
      //this.router.navigate(['Products'])
      this.positions=data;
      console.log(data);
     // alert("f");
    }
  );
}

  getPositions():void{
    this.positionService.getListPositions().subscribe(data=>{
      this.listPositions=data;
       this.listPositions.push(...data);
    },error=>{
      console.log(error)
    })

  }
  updatePosition(position:any){
let route = '/add-position';
        this.router.navigate([route], { queryParams: { position:position.positionId } });
  }

  desactiverPosition(positionId: number) {
    this.positionService.deactiverPosition(positionId).subscribe(
      (response) => {
        console.log('Position désactivée avec succès !');
  
        Swal.fire("La Position est deactivée ",'','success');
      
  
       this.obtenirPositionsStatutFalse();
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
