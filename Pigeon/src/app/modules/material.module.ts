import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule, FormsModule, RouterLink, RouterLinkActive
  ],
  exports: [
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule, FormsModule, RouterLink, RouterLinkActive
  ]
})
export class MaterialModule { }
