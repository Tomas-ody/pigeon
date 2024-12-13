import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule
  ],
  exports: [
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule
  ]
})
export class MaterialModule { }
