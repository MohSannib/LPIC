import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingmaComponent } from './trainingma.component';

describe('TrainingmaComponent', () => {
  let component: TrainingmaComponent;
  let fixture: ComponentFixture<TrainingmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
