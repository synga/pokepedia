import { Pokemon } from 'src/app/models/pokemon.model';
import { ComponentsService } from 'src/app/services/components.service';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonsStore } from './../../stores/pokemon.store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Página que exibe os detalhes de um pokémon
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  /**
   * Dados do pokémon que vieram na navegação ou que vai ser pego por id
   */
  public pokemon: Pokemon;

  /**
   * Numero do pokémon na listagem oficial
   */
  public number: string;

  /**
   * Construtor da classe com os serviços injetados
   */
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _pokemonStore: PokemonsStore,
    private _pokedex: PokedexService,
    private _components: ComponentsService,
    public _location: Location
  ) { }

  /**
   * Vai pegar os dados do pokémon, pode fazer isso de algumas formas:
   * - Primeiro verifica se veio na navegação,
   * - Caso não veio, pega no store,
   * - Se ainda assim não veio, busca via HTTP
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      // pega o id
      const id = params.get('id');
      // transforma o id em numero para apresentação
      this.number = id.padStart(3, '0');
      // Se existe uma navegação, ou seja, veio da home, entra aqui e pega o estado da navegação
      if (this._router.getCurrentNavigation()) {
        this.pokemon = this.initializePokémonInformation(this._router.getCurrentNavigation().extras.state);
      } else {
        // se não veio pela navegação, então pode ser que o usuario digitou id diretamente na url
        // por isso inicializa o store dos pokemons
        await this._pokemonStore.initializeStore();
        // se esse pokémon está no store, pega os dados dele
        if (this._pokemonStore.getPokemons[id]) {
          this.pokemon = this.initializePokémonInformation(this._pokemonStore.getPokemons[id]);
        } else {
          // se o pokémon não está no store, então busca na API
          const getPokemon$ = this._pokedex.getPokemonByID(id);
          this._components.showLoaderUntilCompleted(getPokemon$).subscribe(pokemon => {
            this.pokemon = this.initializePokémonInformation(pokemon);
          });
        }
      }
    });
  }

  /**
   * Como os dados da API vem diferente dos usados na aplicação, então organizo de forma correta
   * utilizando esse método. Que faz basicamente o mesmo código que tem no metodo do serviço de
   * pokedex, mas resolvi deixar um exclusivo aqui
   */
  initializePokémonInformation(pokemon): Pokemon {
    return {
      height: pokemon.height,
      id: pokemon.id,
      name: pokemon.name.split('-')[0],
      sprites: {
        front: pokemon.sprites.front ? pokemon.sprites.front : pokemon.sprites.front_default,
        official: pokemon.sprites.official ? pokemon.sprites.official : pokemon.sprites.other['official-artwork'].front_default
      },
      stats: pokemon.stats,
      types: pokemon.types.map(type => +type.type.url.split('type/')[1].replace(/[^0-9]/g, '')),
      weight: pokemon.weight
    };
  }

}
