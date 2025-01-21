import { Component, inject } from '@angular/core';
import { Pigeon } from '../entities/pigeon';
import { ActivatedRoute } from '@angular/router';
import { PigeonService } from '../pigeon.service';
import { map, Observable } from 'rxjs';
import { User } from '../entities/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-family-tree',
  imports: [],
  templateUrl: './family-tree.component.html',
  styleUrl: './family-tree.component.css'
})
export class FamilyTreeComponent {

  constructor () {}

  route = inject(ActivatedRoute);
  pigeonService = inject(PigeonService);
  userService = inject(UserService);
  
  pigeon?: Pigeon;
  papaPigeon?: Pigeon;
  mamaPigeon?: Pigeon;
  childrenPigeons: Pigeon[] = [];

  ngOnInit() {
    const pigeonId = this.route.snapshot.paramMap.get("id")

    this.pigeonService.getPigeon(Number(pigeonId)).subscribe(
      (response) => {
        if (response) {
          this.getOwner(response.ownerId).subscribe(
            (ownerResponse) => {
              response.owner = User.clone(ownerResponse);
              this.pigeon = Pigeon.clone(response);
              console.log(this.pigeon);
            }
          )
          
          console.log(this.pigeon);

          if (response.fatherId != 0) {
            this.pigeonService.getPigeon(response.fatherId).subscribe(
              (fatherResponse) => {
                this.getOwner(fatherResponse.ownerId).subscribe(
                  (ownerFatherResponse) => {
                    fatherResponse.owner = User.clone(ownerFatherResponse);
                    this.papaPigeon = Pigeon.clone(fatherResponse);
                  }
                )
                
                console.log(this.papaPigeon);
              }
            )
          }
          if (response.motherId != 0) {
            this.pigeonService.getPigeon(response.motherId).subscribe(
              (motherResponse) => {
                this.getOwner(motherResponse.ownerId).subscribe(
                  (ownerMotherResponse) => {
                    motherResponse.owner = User.clone(ownerMotherResponse);
                    this.mamaPigeon = Pigeon.clone(motherResponse);
                  }
                )
                
                console.log(this.mamaPigeon);
              }
            )
          }
          if (response.kidsId != null && response.kidsId.length > 0) {
            response.kidsId.forEach(element => {
              this.pigeonService.getPigeon(element).subscribe(
                (kidResponse) => {
                      this.getOwner(kidResponse.ownerId).subscribe(
                    (ownerKidResponse) => {
                      kidResponse.owner = User.clone(ownerKidResponse);
                      this.childrenPigeons.push(Pigeon.clone(kidResponse));
                    }
                  );
                  
                  console.log(kidResponse);
                }
              )
            });
          }
        }
      }
    );
  }

  getOwner(id: number): Observable<User> {
    return this.userService.getOtherUser(id)
  }
}
