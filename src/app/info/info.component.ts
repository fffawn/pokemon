import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../pokemon.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass']
})
export class InfoComponent implements OnInit {
  pokemon = {};

  constructor(
    protected pokemonService: PokemonService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line:variable-name
    const param_id = this.route.snapshot.paramMap.get('id');

    this.pokemonService.getPokeInfo('https://pokeapi.co/api/v2/pokemon/' + param_id)
      .subscribe((data) => {
        this.pokemonService.getPokeInfo('https://pokeapi.co/api/v2/pokemon-species/' + param_id)
          .subscribe((data2) => {
            this.pokemon.id = data.id;
            this.pokemon.name = data.name;
            this.pokemon.abilities = data.abilities.map(f => f.ability.name).join(', ');
            this.pokemon.height = data.height;
            this.pokemon.evolved_from = data2.evolves_from_species != null ? data2.evolves_from_species.name : null;
            this.pokemon.weight = data.weight;
            this.pokemon.images = Object.values(data.sprites);
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
  }
}
