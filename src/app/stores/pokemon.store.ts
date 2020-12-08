import { Pokemon } from '../models/pokemon.model';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

/**
 * Store que lida com os pokémons salvos no localStorage e salva eses pokemons em um subject.
 * Ao inicializar a aplicação carrega eles, caso seja feita uma chamada para pegar um pokemon por
 * id, primeiro verifica se ele não existe no localStorage
 *
 * Ia fazer um store com BehavourSubject, mas seria complexidade de mais a toa. Farei se sentir
 * necessidade mais pra frente
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonsStore {

  /**
   * BehaviourSubject privado para fazer a comunicação e disparar novos cursos e aquela coisa toda
   */
  private pokemonsDB: { [key: string]: Pokemon } = {};

  /**
   * Construtor da classe com os serviços injetados
   */
  constructor(
    private dbService: NgxIndexedDBService
  ) {}

  /**
   * Inicializa o store buscando os dados salvos no IndexedDB
   */
  initializeStore(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dbService.getAll('pokemon').subscribe(async pokemonDB => {
        (await pokemonDB).forEach(pokemon => {
          this.pokemonsDB[pokemon.id] = pokemon;
        });
        resolve();
      });
    });
  }

  /**
   * getter que apenas retorna os pokémons que estão no DB
   */
  get getPokemons(): { [key: string]: Pokemon } {
    return this.pokemonsDB;
  }

  /**
   * Atualiza os pokemons no indexedDB e no store
   */
  set setPokemons(pokemonList: Pokemon[]) {
    // itera por todos os pokémons que vieram por argumento
    // filtra os que já existem no array local
    // os que não existem então atribui e salva no DB
    pokemonList
      .filter(pokemon => !this.pokemonsDB[pokemon.id])
      .forEach(pokemon => {
        // atribuir no store o pokémon para seu id
        this.pokemonsDB[pokemon.id] = pokemon;
        // salva no indexedDB
        this.dbService.add('pokemon', pokemon, pokemon.id);
      });
  }

}
