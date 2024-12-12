import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MessageComponent } from './shared/message/message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pigeon';
}
