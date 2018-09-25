import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAnalizadorArchivoComponent } from './alta-analizador-archivo.component';

describe('AltaAnalizadorArchivoComponent', () => {
  let component: AltaAnalizadorArchivoComponent;
  let fixture: ComponentFixture<AltaAnalizadorArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaAnalizadorArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAnalizadorArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
