# PokéPedia.

Projeto feito para uma entrevista de emprego. Foram alterados alguns aspectos e adicionadas novas features.

A ideia era uma simples página para consultar pokémons em forma de páginação, uma busca por nome e uma página de detalhes.

## Live Preview

Foi feito deploy via Vercel e o app pode ser visitado no link: https://pokepedia-swart.vercel.app/

## A Aplicação.

A aplicação consiste de uma pokedex onde é possivel consultar alguns dados de pokémons. Na página inicial é possivel ver os pokémons por ordem utilizando um páginador, pesquisar um pokémon por nome (que envia diretamente para a página de detalhes) ou pesquisar por tipo de pokémon, trazendo todos os pokémons que fazem parte daquele tipo (por tipo entenda fogo, lutador, voador, etc).

Na página de detalhes é possível ver as estátisticas do pokémon como ataque, defesa e informações como altura e peso.

Além disso, a home também possui uma terceira opção que é de um jogo inspirado no "Who's that P
okémon" (Quem é esse Pokémon?) que sempre acontecia nos intervalos de cada episódio. É um jogo simples onde se deve tentar adivinhar o nome do pokémon vendo apenas a sombra dele.

O jogo só funciona se estiver online! Offline seja no navegador ou PWA a opção é escondida.

## Tecnologias

A aplicação foi feita utilizando Angular 10, CSS (inicialmente seria em SASS, mas o CSS já resolve todos os problemas), RxJS, a [Pokeapi](https://pokeapi.co/) para consumo dos dados, Angular Material para alguns componentes, Compodoc para documentação, Dockerfile para quem quiser rodar no Docker, IndexedDB para persistência de alguns dados e PWA para funcionamento offline da pokedex.

## O que não foi feito

De inicio a ideia era ser TDD, porém com o pouco conhecimento de testes que possuo e por ser para entrevista isso estava me atrapalhando> Deixei os testes para depois ao menos para garantir um coverage de 80% do código.

## Próximos passos

- Testes, tanto unitários com o Jasmine quanto Cypress para e2e.
- Melhorar o jogo: Tornar possível escolher a temporada que quer jogar.
- Melhorar o uso do IndexedDB: Alguns endpoints não buscam no IndexedDB se o Pokémon está salvo, passar a verificar lá antes de devolver um observável com a chamada HTTP.
- Tratar os subscribes e remove-los quando destruir um componente ou navegar.
