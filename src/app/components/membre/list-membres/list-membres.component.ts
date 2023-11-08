import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/class/member';
import { Position } from 'src/app/class/position';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-list-membres',
  templateUrl: './list-membres.component.html',
  styleUrls: ['./list-membres.component.css']
})
export class ListMembresComponent implements OnInit {

  members:Member[] =[];
  listPositions: Position[]=[];
  positionId:any;
  

  constructor(private http: HttpClient,private memberService:MemberService,private route:ActivatedRoute,private router:Router,
    private positionService :PositionService) {}



  ngOnInit() {
    this.getPositions();
    this.listMembers();
    /*this.route.paramMap.subscribe(() =>{
      this.listMembers();
      this.getPositions();
    });*/
    
    
  }
  listMembers(){
    this.memberService.getMemberList().subscribe(data =>{
        this.members = data;
      }
    )
  }
  getPositions():void{
    this.positionService.getListPositions().subscribe(data=>{
      this.listPositions=data;
       this.listPositions.push(...data);
    },error=>{
      console.log(error)
    })

  }
  updateMember(member:any){
    let route = '/ajout-membre';
        this.router.navigate([route], { queryParams: { member:member.memberId } });
  }
  deleteMember(member:any){
    this.memberService.deleteMember(member.memberId).subscribe(
      (data) => {console.log(data);
        this.listMembers();},
      (err) => {console.log(err);}
    );
  }
  
}
