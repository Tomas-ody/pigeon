import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Message } from './shared/message/message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Message],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pigeon';
}
