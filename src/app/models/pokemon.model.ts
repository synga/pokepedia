/**
 * Interface para tipar os dados de pokém pós map.
 * O retorno da API é muito extenso e traz muito coisa que não aproveito. Então
 * mapeio e deixo só esses
 */
export interface Pokemon {
  /**
   * Tamanho de um pokémon em decimetros
   */
  height: number;
  /**
   * ID do pokémon (também é seu número oficial na série)
   */
  id: number;
  /**
   * Nome do pokémon (pode haver variações com "-default", por exemplo)
   */
  name: string;
  /**
   * Imagens do pokémon
   */
  sprites: {
    /**
     * Imagem de frente no jogo (da primeira geração que ele aparece)
     */
    front: string;
    /**
     * Imagem de arte oficial do Pokémon
     */
    official: string;
  };
  /**
   * Array de status
   */
  stats: {
    /**
     * Status base quando o pokémon é capturado
     */
    base_stat: number;
    /**
     * Usado para calculo de ganho de status na evolução
     */
    effort: number;
    /**
     * Outros dados do status
     */
    stat: {
      /**
       * Nome do status
       */
      name: string;
      /**
       * URL para mais informações do status
       */
      url: string;
    }
  }[];
  /**
   * Array de tipos, pode conter até 2 valores
   */
  types: {
    /**
     * Ordem desse tipo na exibição oficial do pokémon
     */
    slot: number;
    /**
     * Outros dados do tipo
     */
    type: {
      /**
       * Nome do tipo
       */
      name: string;
      /**
       * URL para acessar mais dados do tipo, como listagem de pokémon
       */
      url: string;
    }
  }[];
  /**
   * Peso do pokémon
   */
  weight: number;
}
