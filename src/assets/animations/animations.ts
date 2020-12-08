import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

/**
 * Aniação para listas do ngfor onde carrega cada item com um certo delay
 */
export const ngForAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [
        style({ opacity: 0 }),
        stagger('100ms',
        animate('600ms ease-in-out',
        style({ opacity: 1 })))],
      { optional: true }
    )
  ])
]);
