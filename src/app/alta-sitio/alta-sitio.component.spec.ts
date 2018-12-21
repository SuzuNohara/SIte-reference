import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSitioComponent } from './alta-sitio.component';

describe('AltaSitioComponent', () => {
  let component: AltaSitioComponent;
  let fixture: ComponentFixture<AltaSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
