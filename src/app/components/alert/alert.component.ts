import { ComponentsService } from 'src/app/services/components.service';
import { Component } from '@angular/core';

/**
 * Componente que exibe uma alerta de erro caso algo tenha acontecido. A mensagem passada direto
 * para o template por um pipe de async.
 * A unica necessidade para ele até agora é quando o usuário busca por um pokémon que
 * não existe, de todo resto a API parece bem robusta.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  /**
   * Construtor da classe com os serviços injetados
   * @param _components Serviço que controla os componentes
   */
  constructor(public _components: ComponentsService) { }
}
