import { ComponentsService } from 'src/app/services/components.service';
import { Observable } from 'rxjs';
import { PokedexService } from 'src/app/services/pokedex.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {
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
    // Pega um ID entre 1 e 898. Por enquanto está hardcoded o numero maximo, depois arrumo
    const randomID = Math.floor(Math.random() * 898) + 1;
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
