import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingmuComponent } from './trainingmu.component';

describe('TrainingmuComponent', () => {
  let component: TrainingmuComponent;
  let fixture: ComponentFixture<TrainingmuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingmuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingmuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
