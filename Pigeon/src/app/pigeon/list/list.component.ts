import { Component, inject, OnInit } from '@angular/core';
import { PigeonService } from '../pigeon.service';
import { Pigeon } from '../entities/pigeon';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  constructor (

  ) { }

  pigeonService = inject(PigeonService);
  showError = false;
  pigeons?: Pigeon[];

  ngOnInit(): void {
    this.loadDataAllPigeons();
  }

  loadDataAllPigeons() {
    this.pigeonService.getPigeons().subscribe({
      next: (pigeons: Pigeon[]) => {
        this.pigeons = pigeons;
        this.showError = false;
      },
      error: err => {
        this.showError = true;
      }
    });
  }

  goToFamilyTree(pigeon: Pigeon) {
    this.pigeonService.openFamilyTree(pigeon.id);
    }
}
