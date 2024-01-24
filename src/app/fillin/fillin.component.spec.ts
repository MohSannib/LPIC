import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillinComponent } from './fillin.component';

describe('FillinComponent', () => {
  let component: FillinComponent;
  let fixture: ComponentFixture<FillinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
