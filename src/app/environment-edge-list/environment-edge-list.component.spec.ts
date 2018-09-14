import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentEdgeListComponent } from './environment-edge-list.component';

describe('EnvironmentEdgeListComponent', () => {
  let component: EnvironmentEdgeListComponent;
  let fixture: ComponentFixture<EnvironmentEdgeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentEdgeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentEdgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
