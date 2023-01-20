import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Pokemon } from 'src/app/models/pokemon';
import { CommonService, PokemonService } from 'src/app/services';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LoaderModule } from '../loader';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ModalDetailsComponent } from '../modal-details';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    LoaderModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Output() pokemonEmitted = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('auto') auto: { close: () => void; open: () => void; focus: () => void; } | undefined;

  displayedColumns: string[] = [ 'image', 'name', 'details' ];
  dataSource!: MatTableDataSource<Pokemon>;
  loading!: boolean;
  pokemons!: any[];
  details!: boolean;
  keyword = 'name';
  pokemonSelectedId: number;
  mobile: boolean;

  constructor(private observer: BreakpointObserver, private commonService: CommonService, private pokemonService: PokemonService,
    public dialog: MatDialog) {
    this.auto?.close;
    this.pokemonSelectedId = -1;
    this.mobile = false;
  }

  ngOnInit(): void {
    this.details = false;
    this.load();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 857px)']).subscribe({
      next: (res) => {
        if (res.matches) {
          this.mobile = true;

        } else {
          this.mobile = false;

        }
      },
      error: (error: Error) => {
        console.log(error);

      }
    });
  }

  load(): void {
    this.loading = true;
    this.commonService.getAll().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons.results;
        this.pokemonService.setPokemonsList(this.pokemons);
        let contador = 0;
        this.pokemons.forEach(pokemon => {
          contador++;
          pokemon.id = contador;
        });
        this.dataSource = new MatTableDataSource(this.pokemons);
        this.dataSource.paginator = this.paginator;
        this.loading = false;

        // Aca habia hecho un promiseall de las url con los detalles de cada pokemon
        // Decidi no hacerlo asi, porque demoraba mucho y me fallaba todo el tiempo

        /*let pokemonsList: any[] = pokemons.results;
        Promise.all(pokemonsList.map(u=>fetch(u.url, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }))).then(responses =>
          Promise.all(responses.map(res => res.json()))

        ).then(pokemonDetails => {
          this.pokemons = pokemonDetails;
          console.log(this.pokemons);

          this.dataSource = new MatTableDataSource(this.pokemons);
          this.dataSource.paginator = this.paginator;
          this.loading = false;

        })*/
      },
      error: (error: Error) => {
        this.loading = false;
        console.log(error);

      }
    });
  }

  applyFilter(event: any, val: string) {
    let filterValue = "";
    if (val === " ") {

    } else if (val === "") {
      filterValue = (event.target as HTMLInputElement).value;

    } else {
      filterValue = val;

    }
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seeDetails(index: number, pokemon: any): void {
    if (!this.mobile) {
      this.checkPokemonSelected(index);
      this.pokemonSelectedId = index;
      pokemon.showDetails = true;
      this.addNewPokemonDetails(pokemon);

    } else {
      let data = pokemon;
      this.dialog.open(ModalDetailsComponent, {
        width: '90vw',
        height: '55vh',
        disableClose: false,
        panelClass: 'modal-table-Measurement',
        data: data,

      });
    }
  }

  checkPokemonSelected(index: number) {
    if (this.pokemonSelectedId !== -1 && index !== this.pokemonSelectedId) {
      this.pokemons[this.pokemonSelectedId].showDetails = false;
    }
  }

  seePokeball(pokemon: any): void {
    pokemon.showDetails = false;
    this.addNewPokemonDetails(pokemon);
  }

  selectEvent(pokemon: any) {
    this.applyFilter("", pokemon.name)
  }

  closeFilter() {
    this.applyFilter("", " ");
  }

  openPanel(e: any): void {
    e.stopPropagation();
    this.auto?.open();
  }

  closePanel(e: any): void {
    e.stopPropagation();
    this.auto?.close();
    }

  focus(e: any): void {
    e.stopPropagation();
    this.auto?.focus();
  }

  addNewPokemonDetails(pokemon: any) {
    this.pokemonEmitted.emit(pokemon);
  }

}
