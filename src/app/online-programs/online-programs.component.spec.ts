import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineProgramsComponent } from './online-programs.component';

describe('OnlineProgramsComponent', () => {
  let component: OnlineProgramsComponent;
  let fixture: ComponentFixture<OnlineProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineProgramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
