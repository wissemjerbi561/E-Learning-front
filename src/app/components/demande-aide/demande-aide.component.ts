import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demande-aide',
  templateUrl: './demande-aide.component.html',
  styleUrls: ['./demande-aide.component.css']
})
export class DemandeAideComponent  {
  helpForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DemandeAideComponent> ,private formBuilder: FormBuilder
    ) {
      this.helpForm = this.formBuilder.group({
        objet: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  
    closeModal(): void {
      this.dialogRef.close();
    }
  
    onSubmit(): void {
      console.log(this.helpForm.value);
  
      this.dialogRef.close();
    }
  }