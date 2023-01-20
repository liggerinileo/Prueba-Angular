import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent {
  pokemonDetails: any;

  constructor(private commonService: CommonService, private dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, public dialog: MatDialog) {
      this.load(data);

  }


  load(pokemon: any): void {
    this.commonService.get(pokemon.name).subscribe({
      next: (details) => {
        this.pokemonDetails = details;

      },
      error: (error: Error) => {
        console.log(error);

      }
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
