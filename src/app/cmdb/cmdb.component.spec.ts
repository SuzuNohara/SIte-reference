import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMDBComponent } from './cmdb.component';

describe('CMDBComponent', () => {
  let component: CMDBComponent;
  let fixture: ComponentFixture<CMDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
