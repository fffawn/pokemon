import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  title = 'Pokémon';
  pokemons: any[] = [];

  constructor(
    protected pokemonService: PokemonService
  ) {
  }

  ngOnInit() {

    this.pokemonService.getPokemons()
      .subscribe(
        (data : any) => { // Success
          // @ts-ignore
          data.results.forEach((pokemon, i) => {
            this.pokemonService.getPokeInfo(pokemon.url)
              .subscribe((data2 : any) => {
                // @ts-ignore
                this.pokemonService.getPokeInfo(data2.species.url)
                  .subscribe((data3 : any) => {
                    this.pokemons.push({id: i + 1, name: pokemon.name, evolved: data3.evolves_from_species != null ? data3.evolves_from_species.name : null, types: data2.types.map(x => x.type.name).join(', ')});
                  }, (error) => {console.log(error)});
              }, (error) => {
                console.error(error);
              });
          });
        },
        (error) => {
          console.error(error);
        }
      );

    console.log(this.pokemons);
  }
}
