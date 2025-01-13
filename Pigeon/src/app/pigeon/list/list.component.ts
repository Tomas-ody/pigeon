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
    //private pigeonService: PigeonService
  ) { }

  pigeonService = inject(PigeonService);
  showError = false;
  pigeons?: Pigeon[];

  ngOnInit(): void {
    //const token = localStorage.getItem("umToken");
    this.pigeonService.getPigeons().subscribe({
      next: (pigeons: Pigeon[]) => {
        this.pigeons = pigeons;
        this.showError = false;
        console.log(this.pigeons);
      },
      error: err => {
        console.log("Chyba: ", err);
        this.showError = true;
      }
    });
  }
}
