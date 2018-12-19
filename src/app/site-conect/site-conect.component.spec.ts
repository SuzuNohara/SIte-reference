import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteConectComponent } from './site-conect.component';

describe('SiteConectComponent', () => {
  let component: SiteConectComponent;
  let fixture: ComponentFixture<SiteConectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteConectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteConectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
