import { Injectable } from '@angular/core';

/**
 * Serviço que tem como o unico intuito centralizar os dados de tipos dos pokémons
 * como cores, cor de contraste, nome.
 *
 * Todas as cores de contraste são brancas pois a legibilidade fica um tanto quanto
 * boa, mas se for necessário mudar o contraste por causa das recomendações do
 * WCAG, então fica mais fácil se for em um só lugar
 */
@Injectable({
  providedIn: 'root'
})
export class TypesService {

  /**
   * Lista com tipos de pokémon para serem usados na badge, com suas respectivas cores e
   * cores de contraste para a font.
   * OBS: Removi os tipos 'unknown' e 'shadow' que a API retorna, mas não tem pokemons
   */
  public pokemonTypes: Map<number, { name: string, color: string, contrast: string }> = new Map([
    [1, { name: 'normal', color: '#A8A878', contrast: '#FFFFFF' }],
    [2, { name: 'lutador', color: '#C03028', contrast: '#FFFFFF' }],
    [3, { name: 'voador', color: '#A890F0', contrast: '#FFFFFF' }],
    [4, { name: 'venenoso', color: '#A040A0', contrast: '#FFFFFF' }],
    [5, { name: 'terra', color: '#E0C068', contrast: '#FFFFFF' }],
    [6, { name: 'rocha', color: '#B8A038', contrast: '#FFFFFF' }],
    [7, { name: 'inseto', color: '#A8B820', contrast: '#FFFFFF' }],
    [8, { name: 'fantasma', color: '#705898', contrast: '#FFFFFF' }],
    [9, { name: 'Metálico', color: '#B8B8D0', contrast: '#FFFFFF' }],
    [10, { name: 'fogo', color: '#F08030', contrast: '#FFFFFF' }],
    [11, { name: 'água', color: '#6890F0', contrast: '#FFFFFF' }],
    [12, { name: 'grama', color: '#78C850', contrast: '#FFFFFF' }],
    [13, { name: 'elétrico', color: '#F8D030', contrast: '#FFFFFF' }],
    [14, { name: 'psíquico', color: '#F85888', contrast: '#FFFFFF' }],
    [15, { name: 'gelo', color: '#98D8D8', contrast: '#FFFFFF' }],
    [16, { name: 'dragão', color: '#7038F8', contrast: '#FFFFFF' }],
    [17, { name: 'Noturno', color: '#705848', contrast: '#FFFFFF' }],
    [18, { name: 'fada', color: '#EE99AC', contrast: '#FFFFFF' }]
  ]);
}
