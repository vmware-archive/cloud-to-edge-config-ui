import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadConfigComponent } from './load-config.component';

describe('LoadConfigComponent', () => {
  let component: LoadConfigComponent;
  let fixture: ComponentFixture<LoadConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
