import { Component, Inject, NgModule } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Pigeon } from '../entities/pigeon';
import { MaterialModule } from '../../modules/material.module';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { PigeonService } from '../pigeon.service';
import { response } from 'express';
import { MessageService } from '../../shared/message.service';
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
    private pigeonService: PigeonService,
    private messageService: MessageService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onApply() {
    this.pigeon.kidsId = this.kidsId;
    this.pigeonService.updatePigeon(this.pigeon).subscribe(
      (response) => {
        if (response) {
          this.messageService.successToast("Pigeon " + this.pigeon.name + " has been updated", "X", 2000);
        }
      }
    );
    this.onCancel();
  }

  kidsIdString: string = '';

  get kidsId(): number[] {
    return this.kidsIdString
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));
  }

  set kidsId(value: number[]) {
    this.kidsIdString = value.join(',');
  }
}