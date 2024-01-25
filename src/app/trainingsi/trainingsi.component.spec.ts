import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsiComponent } from './trainingsi.component';

describe('TrainingsiComponent', () => {
  let component: TrainingsiComponent;
  let fixture: ComponentFixture<TrainingsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
