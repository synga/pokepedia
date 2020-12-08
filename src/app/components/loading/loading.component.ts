import { Component } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

/**
 * Componente de loading que é exibido de acordo com o observavel no serviço de componentes
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  /**
   * Construtor com os serviços injetados
   * @param _components Serviço de componentes que cuida do loading
   */
  constructor(public _components: ComponentsService) { }
}
