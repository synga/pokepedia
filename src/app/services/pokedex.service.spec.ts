import { POKEMON_LIST } from './../../assets/mock/pokemon-list.mock';
import { Pokemon } from './../models/pokemon.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokedexService } from './pokedex.service';
import { environment } from 'src/environments/environment';
import { POKEMON } from 'src/assets/mock/pokemon.mock';

describe('PokedexService', () => {
  let service: PokedexService;
  /**
   * Para interceptar chamadas HTTP e mocka-las
   */
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokedexService]
    });
    service = TestBed.inject(PokedexService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of Pokemons', () => {
    const limit = POKEMON_LIST.results.length;
    service.getPokemonList(limit).subscribe(pokemons => {
      expect(pokemons.length).toEqual(limit);
      expect(typeof pokemons[0].id).toBe('number');
      expect(pokemons[0].sprites.official).toBeTruthy();
      expect(pokemons[0].types.length).toBeLessThanOrEqual(2);
    });

    const req = httpTesting.expectOne(`${environment.api_url}/pokemon?limit=${limit}&offset=0`);
    expect(req.request.method).toEqual('GET');
    req.flush(POKEMON_LIST);
  });

  it('should return a pokemon by its ID', () => {
    const id = POKEMON.id;
    service.getPokemonByID(id).subscribe((pokemon: Pokemon) => {
      expect(pokemon.name).toBe(POKEMON.name);
      expect(pokemon.sprites.official).toBeTruthy();
      expect(pokemon.types.length).toBeLessThanOrEqual(2);
    });

    const req = httpTesting.expectOne(`${environment.api_url}/pokemon/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(POKEMON);
  });

  it('should return a pokemon by its name', () => {
    const name = POKEMON.name;
    service.getPokemonByName(name).subscribe((pokemon: Pokemon) => {
      expect(pokemon.name).toBe(POKEMON.name);
      expect(pokemon.id).toBeTruthy();
      expect(pokemon.sprites.official).toBeTruthy();
      expect(pokemon.types.length).toBeLessThanOrEqual(2);
    });

    const req = httpTesting.expectOne(`${environment.api_url}/pokemon/${name}`);
    expect(req.request.method).toEqual('GET');
    req.flush(POKEMON);
  });
});
