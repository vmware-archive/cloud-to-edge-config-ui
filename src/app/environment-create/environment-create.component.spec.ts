import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentCreateComponent } from './environment-create.component';

describe('EnvironmentCreateComponent', () => {
  let component: EnvironmentCreateComponent;
  let fixture: ComponentFixture<EnvironmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
