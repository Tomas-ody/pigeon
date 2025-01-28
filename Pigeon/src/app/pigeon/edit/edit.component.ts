import { Component, Inject, NgModule } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Pigeon } from '../entities/pigeon';
import { MaterialModule } from '../../modules/material.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { PigeonService } from '../pigeon.service';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-edit',
  imports: [MatDialogModule, MatFormField, MatLabel, MaterialModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
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
    if (!this.validateForm()) {
      this.messageService.errorToast(
        "Please fill in all required fields correctly.\n" +
        "No negative numbers.\n" +
        "Name has to be at least 3 letters.", "X",4000);
        return;
    }

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

  validateForm(): boolean {
    if (!this.pigeon.name || this.pigeon.name.length < 3) {
      return false; 
    }
    if (this.pigeon.fatherId < 0 || this.pigeon.motherId < 0) {
      return false; 
    }
    return true; 
  }

  kidsIdString: string = '';

  get kidsId(): number[] {
    if (this.pigeon.kidsId != null) {
      this.kidsIdString = this.pigeon.kidsId.toString();
      return this.kidsIdString
        .split(',')
        .map((id: string) => parseInt(id.trim(), 10))
        .filter((id: number) => !isNaN(id));
    }
    return [];
  }

  set kidsId(value: number[]) {
    this.kidsIdString = value.join(',');
  }
}
