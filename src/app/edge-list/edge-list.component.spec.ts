import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeListComponent } from './edge-list.component';

describe('EdgeListComponent', () => {
  let component: EdgeListComponent;
  let fixture: ComponentFixture<EdgeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
