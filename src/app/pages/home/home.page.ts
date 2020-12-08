import { Pokemon } from '../../models/pokemon.model';
import { map } from 'rxjs/operators';
import { TypesService } from './../../services/types.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonsStore } from 'src/app/stores/pokemon.store';
import { Observable } from 'rxjs';
import { ngForAnimation } from 'src/assets/animations/animations';



/**
 * Página inicial da aplicação, deverá exibir uma lista de pokémons paginada ou
 * lista de pokémons por tipo
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [ngForAnimation]
})
export class HomePage implements OnInit {

  /**
   * Propriedade para alterar qual lista está vendo, a páginada ou por tipo
   */
  public viewList = 'Pokémon';

  /**
   * Observável que vai receber o total de itens na API para usar no paginador
   */
  public length$: Observable<number>;

  /**
   * Limite de dados para buscar
   */
  public limit = 25;

  /**
   * Diferentes opções de limites para a busca
   */
  public limitOptions = [10, 25, 50];

  /**
   * Array de pokémons para apresentar na view de paginação
   */
  public pokemonsPaginated: Partial<Pokemon>[];

  /**
   * Array de pokémons de um determinado tipo para apresentar na view
   */
  public pokemonsByType: Partial<Pokemon>[];

  /**
   * Todos os tipos de pokémons para serem utilizados na busca por tipos
   */
  public types: {
    name: string;
    color: string;
    contrast: string;
  }[];

  /**
   * Construtor com os serviços injetados
   */
  constructor(
    private _pokedex: PokedexService,
    private _pokemonsStore: PokemonsStore,
    private _types: TypesService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Ao iniciar a home vai buscar os dados dos pokémons.
   * Como o endpoint de paginação da API retorna o nome e a url para acessar um certo pokémon,
   * o metodo getPokemonList faz uma junção de pokémons que estão salvos no indexedDB e
   * pokémons que devem ser pegos na API.
   * Depois que tem essa junção, salva os novos pokémons no indexedDB
   */
  async ngOnInit(): Promise<void> {
    await this._pokemonsStore.initializeStore();
    this.length$ = this._pokedex.length$;
    this.types = Array.from(this._types.pokemonTypes, (type) => type[1]);
    this.getPokemonPaginatorList();
  }

  /**
   * Busca a lista de pokemons que deve ser exibida quando está com o campo de busca e páginador
   * @param limit Quantidade de itens que deve trazer
   * @param offset Numero de itens que deve pular para então buscar dados
   */
  getPokemonPaginatorList(limit: number = 25, offset: number = 0): void {
    this._pokedex.getPokemonList(limit, offset)
      .subscribe((pokemons) => {
        this.pokemonsPaginated = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }

  /**
   * Muda a página ao avançar, voltar ou alterar o tamanho limite. Atribui o novo valor do limite
   * e calcula o offset pela pagina atual * tamanho de itens, vai dar quantos deve pular.
   */
  changePage(event): void {
    this.limit = event.pageSize;
    this.getPokemonPaginatorList(this.limit, event.pageIndex * this.limit);
  }

  /**
   * Ao clicar para buscar no componente de search vai disparar essa função que busca um
   * pokémon por nome e já direciona para a página de detalhes
   */
  onSearch(searchTerm: string): void {
    this._pokedex.getPokemonByName(searchTerm).subscribe(pokemon => {
      this._router.navigate([pokemon.id], {
        relativeTo: this.route,
        state: { pokemon }
      });
    });
  }

  /**
   * Navega para a página do pokémon após clique em card
   */
  goToPokemonDetails(pokemon): void {
    this._router.navigate([pokemon.id], {
      relativeTo: this.route,
      state: { pokemon }
    });
  }

  /**
   * Carrega todos os pokémons de um determinado tipo
   */
  loadPokemonByType(id: number): void {
    this._pokedex.getPokemonListByType(id)
      .subscribe(pokemons => {
        this.pokemonsByType = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }

}
