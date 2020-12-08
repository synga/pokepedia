import { DetailsPage } from './../details/details.page';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { PokedexService } from 'src/app/services/pokedex.service';

import { HomePage } from './home.page';
import { POKEMON } from 'src/assets/mock/pokemon.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let el: DebugElement;
  let _pokedex: any;


  beforeEach(async () => {
    const pokedexSpy = jasmine.createSpyObj(PokedexService, ['getPokemonList', 'getPokemonByID', 'getPokemonByName']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [{ provide: PokedexService, useValue: pokedexSpy }],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: ':id', component: DetailsPage }
      ])],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    _pokedex = TestBed.inject(PokedexService);
    _pokedex.getPokemonList.and.returnValue(of(new Array(25).fill(POKEMON)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a pokemon list', () => {
    // expect(component.pokemonsPaginated.length).toBe(25);
    // pegar se os cards estão na tela
  });

  it('should search a pokémon by name and navigate to details', waitForAsync(inject([Location], (location: Location) => {
    _pokedex.getPokemonByName.and.returnValue(of(POKEMON));
    component.onSearch('ditto');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual(`/${POKEMON.id}`);
    })
  })));

  it('should get a pokémon list by type', () => {

  });
});
