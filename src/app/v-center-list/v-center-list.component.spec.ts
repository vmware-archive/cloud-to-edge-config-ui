import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCenterListComponent } from './v-center-list.component';

describe('VCenterListComponent', () => {
  let component: VCenterListComponent;
  let fixture: ComponentFixture<VCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCenterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
