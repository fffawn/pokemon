import { Component, OnInit } from '@angular/core';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Pokémon';
  pokemons: any[] = [];
  informations: any[] = [];

  constructor(
    protected pokemonService: PokemonService
  ) {
  }

  ngOnInit() {
    this.pokemonService.getPokemons()
      .subscribe(
        (data) => { // Success
          data.results.forEach((pokemon, i) => {
            this.pokemonService.getPokeInfo(pokemon.url)
              .subscribe((data2) => {
                this.pokemons.push({id: i + 1, name: pokemon.name, types: data2.types.map(x => x.type.name).join(', ')});
            }, (error) => {
                console.error(error);
            });
          });

          console.log(this.pokemons);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
