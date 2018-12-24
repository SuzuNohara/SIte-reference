import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoSoporteComponent } from './grupo-soporte.component';

describe('GrupoSoporteComponent', () => {
  let component: GrupoSoporteComponent;
  let fixture: ComponentFixture<GrupoSoporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoSoporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
