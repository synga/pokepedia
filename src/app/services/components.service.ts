import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

/**
 * Serviço que controla os componentes de alerta e loading
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  /**
   * Subject para guardar o valor do loading e emitir os valores
   */
  private loadingSubject = new BehaviorSubject<boolean>(false);
  /**
   * Observável que vai refletir o valor de loading e ser assinado
   */
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Subject para guardar o valor do alert e emitir os valores
   */
  private alertSubject = new BehaviorSubject<string>(null);
  /**
   * Observável que vai refletir o valor de alert e ser assinado
   */
  alert$: Observable<string> = this.alertSubject.asObservable();

  /**
   * Mostra o loading até completar o observável passado por parametro
   * @param obs$ Qualquer observável de chamda HTTP ou metodos que precisam do loading
   */
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
      );
  }

  /**
   * Ativa o loading
   */
  private loadingOn(): void {
    this.loadingSubject.next(true);
  }

  /**
   * Desativa o loading
   */
  private loadingOff(): void {
    this.loadingSubject.next(false);
  }

  /**
   * Mostra o alerta com a mensagem que foi passada por parametro
   * @param message Mensagem do alerta
   */
  showAlertWithMessage(message: string): void {
    this.alertSubject.next(message);
  }

  /**
   * Esconde o alerta
   */
  hideAlert(): void {
    this.alertSubject.next(null);
  }
}
