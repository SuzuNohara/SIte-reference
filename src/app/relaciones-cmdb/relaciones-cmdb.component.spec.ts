import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesCMDBComponent } from './relaciones-cmdb.component';

describe('RelacionesCMDBComponent', () => {
  let component: RelacionesCMDBComponent;
  let fixture: ComponentFixture<RelacionesCMDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionesCMDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionesCMDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
