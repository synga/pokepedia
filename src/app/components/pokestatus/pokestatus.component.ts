import { Component, Input } from '@angular/core';

/**
 * Componente para exibir uma barra com algum status do pokémon para ter
 * uma noção do quão bom ou ruim aquele status é.
 *
 * Talvez status não seja o nome correto, pois no jogo "status" se referem a status
 * inflingidos e que prejudicam o pokémon, como 'burn' ou 'sleep'. Mas por hora
 * da pra entender
 */
@Component({
  selector: 'app-pokestatus',
  templateUrl: './pokestatus.component.html',
  styleUrls: ['./pokestatus.component.scss']
})
export class PokestatusComponent {

  /**
   * Nome dos status traduzidos.
   */
  public statusNames: Map<string, { name: string, color: string }> = new Map([
    ['hp', { name: 'Vida', color: '#FF5959' }],
    ['attack', { name: 'Ataque', color: '#F5AC78' }],
    ['defense', { name: 'Defesa', color: '#FAE078' }],
    ['special-attack', { name: 'Ataque SP', color: '#6890F0' }],
    ['special-defense', { name: 'Defesa SP', color: '#78C850' }],
    ['speed', { name: 'Velocidade', color: '#FA92B2' }]
  ]);

  /**
   * Input apenas com os dados de status de um pokémon. Não achei viavel tipar ele
   * então deixa com esse "any" implicito
   */
  @Input() status;
}
