/**
 * Interface dos dados retornados na busca da API quando se busca por listas
 */
export interface PokemonList {
  /**
   * Total de pokémons na API
   */
  count: number;
  /**
   * URL para p´roxima chamada
   */
  next: string;
  /**
   * URL para chamada anterior
   */
  previous: any;
  /**
   * Resultados da consulta
   */
  results: {
    /**
     * Nome do pokémon
     */
      name: string;
      /**
       * URL para dados detalhados do pokémon
       */
      url: string;
  }[];
}
