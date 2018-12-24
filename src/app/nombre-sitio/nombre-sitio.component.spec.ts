import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreSitioComponent } from './nombre-sitio.component';

describe('NombreSitioComponent', () => {
  let component: NombreSitioComponent;
  let fixture: ComponentFixture<NombreSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
