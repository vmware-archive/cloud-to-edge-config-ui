import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCenterComponent } from './v-center.component';

describe('VCenterComponent', () => {
  let component: VCenterComponent;
  let fixture: ComponentFixture<VCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
