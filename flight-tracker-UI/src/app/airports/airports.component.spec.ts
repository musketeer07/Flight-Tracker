import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsComponent } from './airports.component';

describe('AirportsComponent', () => {
  let component: AirportsComponent;
  let fixture: ComponentFixture<AirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
