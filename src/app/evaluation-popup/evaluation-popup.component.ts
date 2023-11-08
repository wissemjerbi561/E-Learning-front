import { Component, OnInit } from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-evaluation-popup',
  templateUrl: './evaluation-popup.component.html',
  styleUrls: ['./evaluation-popup.component.css']
})
export class EvaluationPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() ratingSelected: EventEmitter<number> = new EventEmitter<number>();

  selectRating(rating: number) {
    this.ratingSelected.emit(rating);
  }
  
}
