import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { PokemonService } from '../service/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule],
})
export class HomePage implements OnInit {
  private _pokemonService = inject(PokemonService);

  modalActive: String = '';
  pokemons: any[] = [];
  pokemonModal: any;
  search: string = '';
  pokemonDescription: String = '';

  urlImgPokemonImage: String =
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
  urlImgPokemonFull: String =
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    this._pokemonService.getPokemonList().subscribe((pokemon) => {
      this.getDetalleCard(pokemon.results, null);
    });
  }

  getDetalleCard(pokemonList: any | null, name: String | null) {
    if (name == null) {
      for (let index = 0; index < pokemonList.length; index++) {
        this._pokemonService
          .getPokemonDetails(pokemonList[index].name)
          .subscribe((pokemon) => {
            this.pokemons.push(pokemon);
          });
      }
    } else {
      this._pokemonService.getPokemonDetails(name).subscribe((pokemon) => {
        this.pokemons.push(pokemon);
      });
    }
  }

  getPokemonsType(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.pokemons = [];
    var pokemonSelect: any[] = [];

    if (selectedValue != '') {
      this._pokemonService
        .getPokemonType(selectedValue)
        .subscribe((pokemon) => {
          for (let index = 0; index < 20; index++) {
            pokemonSelect.push({ name: pokemon.pokemon[index].pokemon.name });
          }

          this.getDetalleCard(pokemonSelect, null);
        });
    }else{
      this.getPokemonList();
    }
  }

  getImage(idPokemon: String) {
    idPokemon = this.getId(idPokemon);

    return this.urlImgPokemonImage + '' + idPokemon + '.png';
  }

  getId(idPokemon: String) {
    if (idPokemon < '10') {
      idPokemon = '00' + idPokemon;
    } else if (idPokemon < '100') {
      idPokemon = '0' + idPokemon;
    }

    return idPokemon;
  }

  searchPokemon(name: String) {
      this.pokemons = [];
    if (name != null && name != '') {
      name = name.toLocaleLowerCase();
      this.getDetalleCard(null, name);
    } else {
      this.getPokemonList();
    }
  }

  mostrarModal(pokemon: any) {
    this.modalActive = 'shadow-modal--active';
    this.pokemonModal = pokemon;
    this._pokemonService
      .getPokemonDescription(pokemon.name)
      .subscribe((res) => {
        this.pokemonDescription = res.flavor_text_entries[26].flavor_text;
      });
  }

  ocultarModal() {
    this.modalActive = '';
  }
}
