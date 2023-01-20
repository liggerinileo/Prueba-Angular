import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsList = new BehaviorSubject<any[]>([]);

  constructor() { }

  setPokemonsList(pokemonsList: any[]): void {
    this.pokemonsList.next(pokemonsList);
  }

  getPokemonsList(): Observable<any[]> {
    return this.pokemonsList.asObservable();
  }
}
