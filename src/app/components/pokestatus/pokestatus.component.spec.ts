import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokestatusComponent } from './pokestatus.component';

describe('PokestatusComponent', () => {
  let component: PokestatusComponent;
  let fixture: ComponentFixture<PokestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokestatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
