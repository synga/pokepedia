import { ComponentsService } from 'src/app/services/components.service';
import { Observable } from 'rxjs';
import { PokedexService } from 'src/app/services/pokedex.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Página para o jogo de Who's that pokémon. Algo bem basico, pega todas as gerações e
 *
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {

  /**
   * Range das gerações com numero onde começa e termina
   */
  public generationsRange: Map<string, { min: number, max: number }> = new Map([
    ['first', { min: 1, max: 151 }],
    ['second', { min: 152, max: 251 }],
    ['third', { min: 252, max: 386 }],
    ['fourth', { min: 387, max: 493 }],
    ['fifth', { min: 494, max: 649 }],
    ['sixth', { min: 650, max: 721 }],
    ['seventh', { min: 722, max: 809 }],
    ['eighth', { min: 810, max: 898 }]
  ]);

  /**
   * Form para o usuário marcar as gerações que ele quer visualizar os pokémons no jogo
   */
  public generationsForm: FormGroup = new FormGroup({
    first: new FormControl(true),
    second: new FormControl(false),
    third: new FormControl(false),
    fourth: new FormControl(false),
    fifth: new FormControl(false),
    sixth: new FormControl(false),
    seventh: new FormControl(false),
    eighth: new FormControl(false)
  })

  /**
   * Observável contendo os dados do pokémon para o jogo. Vem de uma busca na API, então
   * deixei como any
   */
  public pokemon$: Observable<any>;

  /**
   * Campo para resposta com o nome do pokémon
   */
  public answer: FormControl = new FormControl('', Validators.required);

  /**
   * Condição da resposta. Se acertou é true, se não acertou é false, vazio é campo de input
   */
  public answerCondition: boolean = null;

  constructor(
    public _location: Location,
    public _components: ComponentsService,
    private _pokedex: PokedexService,
    private router: Router
  ) { }

  /**
   * Ao entrar na página já busca o primeiro pokémon
   */
  ngOnInit(): void {
    /**
     * Assina o status da navegação e se em algum momento for false, então redireciona para a home
     * e dou um alert de que só pode jogar se estiver conectado
     */
    this._pokedex.connection$.subscribe(conn => {
      if (conn === false) {
        this.router.navigate(['/'], { replaceUrl: true });
        this._components.showAlertWithMessage('Só é possivel jogar se você estiver online');
      }
    });
    this.pokemon$ = this._components.showLoaderUntilCompleted(this.getPokemon());
  }

  /**
   * Gera um ID randomico e busca o pokémon com aquele ID para o jogo
   */
  getPokemon(): Observable<any> {
    /**
     * Pega apenas as gerações marcadas
     */
    const generations = Object.entries(this.generationsForm.value).filter(g => g[1]);
    // vai gerar os possiveis ids nas gerações selecionadas
    const possiblePokemons = generations.map(g => {
      // pega o minimo e o maximo de cada geração marcada
      const { min, max } = this.generationsRange.get(g[0]);
      // retorna um id randomico entre o minimo e o maximo
      return Math.floor(Math.random() * (max - min + 1) + min)
    })
    // Pega randomicamente um dos pokémons do array de gerações selecionadas
    const randomID = possiblePokemons[Math.floor(Math.random() * possiblePokemons.length)];
    return this._pokedex.getPokemonByID(randomID);
  }

  /**
   * Tentou adivinhar qual o pokémon
   * @param name Nome do pokémon que está sendo exibido
   */
  tryToGuess(name: string): void {
    if (name.split('-')[0].toLowerCase() === this.answer.value.trim().toLowerCase()) {
      this.answerCondition = true;
    } else {
      this.answerCondition = false;
    }
  }

  /**
   * Tenta novamente
   */
  tryAgain(): void {
    this.pokemon$ = this._components.showLoaderUntilCompleted(this.getPokemon());
    this.answerCondition = null;
    this.answer.setValue('');
  }

}
