import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiaSitioComponent } from './tecnologia-sitio.component';

describe('TecnologiaSitioComponent', () => {
  let component: TecnologiaSitioComponent;
  let fixture: ComponentFixture<TecnologiaSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnologiaSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnologiaSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
