import { TestBed } from '@angular/core/testing';

import { PokemonsStore } from './pokemon.store';

describe('PokemonsStore', () => {
  let service: PokemonsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
