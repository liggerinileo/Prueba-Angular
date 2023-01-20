import { Component } from '@angular/core';
import { CommonService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showDetails: boolean;
  rotatePokeball: boolean;
  pokemonDetails: any;

  constructor(private commonService: CommonService) {
    this.showDetails = false;
    this.rotatePokeball = false;
  }

  load(event: any): void {
    this.commonService.get(event.name).subscribe({
      next: (details) => {
        this.showDetails = false;
        this.pokemonDetails = details;
        this.rotatePokeball = true;
        setTimeout(() => {
          this.showDetails = event.showDetails;
          this.rotatePokeball = false;
        }, 1500)

      },
      error: (error: Error) => {
        console.log(error);

      }
    });
  }

  addPokemon(event: any): void {
    if (event.showDetails) {
      this.load(event);

    } else {
      this.showDetails = event.showDetails;
    }
  }
}
