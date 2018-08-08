import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCreateComponent } from './edge-create.component';

describe('EdgeCreateComponent', () => {
  let component: EdgeCreateComponent;
  let fixture: ComponentFixture<EdgeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
