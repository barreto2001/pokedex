import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  urlPokemons: String = 'https://pokeapi.co/api/v2/pokemon/';
  urlTypePokemons: String = 'https://pokeapi.co/api/v2/type/';
  urlInfoPokemons: String = 'https://pokeapi.co/api/v2/pokemon-species/';

  _http = inject(HttpClient);

  getPokemonList(): Observable<any> {
    return this._http.get<any>(`${this.urlPokemons}?offset=0&limit=12`);
  }

  /**
   * Obtiene los detalles de un Pokémon por su nombre o ID.
   * @param idOrName Nombre o ID del Pokémon.
   * @returns Observable con los detalles del Pokémon.
   */
  getPokemonDetails(name: String): Observable<any> {
    return this._http.get<any>(`${this.urlPokemons}${name}`);
  }

  getPokemonType(type: String): Observable<any> {
    return this._http.get<any>(`${this.urlTypePokemons}${type}?limit=12`);
  }

  getPokemonDescription(name : String){
    return this._http.get<any>(`${this.urlInfoPokemons}${name}`);
  }
}
