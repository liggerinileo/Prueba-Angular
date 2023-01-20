import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/services';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss']
})
export class SummaryTableComponent implements OnInit {
  alphabet: string = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
  chars: string[] = [];
  pokemonByCharList: string[] = [];
  pokemonCountList: number[] = [];
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getPokemonsList().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.countPokemons();
    });
  }

  ngOnInit(): void {
    this.chars = this.alphabet.split(',');
  }

  countPokemons(): void {
    for (let i = 0; i < this.chars.length; i++) {
      this.pokemonByCharList = this.pokemons.filter(p => p.name.charAt(0) === this.chars[i]);
      this.pokemonCountList.push(this.pokemonByCharList.length);

    }
  }

}
