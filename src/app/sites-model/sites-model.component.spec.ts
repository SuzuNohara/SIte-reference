import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesModelComponent } from './sites-model.component';

describe('SitesModelComponent', () => {
  let component: SitesModelComponent;
  let fixture: ComponentFixture<SitesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
