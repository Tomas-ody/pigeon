import { Component, Inject, NgModule } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Pigeon } from '../entities/pigeon';
import { MaterialModule } from '../../modules/material.module';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { PigeonService } from '../pigeon.service';
@Component({
  selector: 'app-edit',
  imports: [MatDialogModule, MatFormField, MatLabel, MaterialModule],
  //standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {


  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public pigeon: Pigeon,
    private pigeonService: PigeonService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onApply() {
    this.pigeonService.updatePigeon(this.pigeon).subscribe();
    this.onCancel();
  }
}