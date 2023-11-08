import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Publication } from 'src/app/class/publication';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {
  @Input() publication: Publication = new Publication( );
  @Output() createPublication: EventEmitter<Publication> = new EventEmitter<Publication>();
  @Output() updatePublication: EventEmitter<Publication> = new EventEmitter<Publication>();
  @Output() addCommentaire: EventEmitter<Publication> = new EventEmitter<Publication>();

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  isCreating: boolean = true;
  isFormVisible: boolean = true;


  ngOnInit(): void {
    this.isCreating = !this.publication.id;
    this.publication.auteur = ` ${localStorage.getItem('username')}`;

  }

  onSubmit() {
    if (this.isCreating) {
      this.createPublication.emit(this.publication);
    } else {
      this.updatePublication.emit(this.publication);

      
    }
  }

  onCancel() {
    this.isFormVisible = false;
    this.cancel.emit();
  }
}