import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Classe para validar o campo de busca. Se houve submit, se esta invalido e caso o usuario
 * tenha modificado ou clicado nele e clicado fora, então apresenta a mensagem de erro.
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Metodo que verifica se o controlador está invalido
   */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Componente que serve apenas para o campo de busca. Emite o valor da busca para o componente
 * pai.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  /**
   * Output para enviar os dados de busca para o componente pai
   */
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Termo para a busca, digitado pelo usuario
   */
  public searchTerm: FormControl = new FormControl('', Validators.required);

  /**
   * Matcher para validar o campo se estiver errado depois do usuario interagir
   */
  public matcher = new MyErrorStateMatcher();

  /**
   * Valida e emite o evento de busca pro componente pai
   */
  doSearch(): void {
    if (this.searchTerm.valid) {
      this.search.emit(this.searchTerm.value.trim());
    }
  }

}
