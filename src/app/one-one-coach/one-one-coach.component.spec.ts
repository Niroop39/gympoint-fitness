import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOneCoachComponent } from './one-one-coach.component';

describe('OneOneCoachComponent', () => {
  let component: OneOneCoachComponent;
  let fixture: ComponentFixture<OneOneCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneOneCoachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOneCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
