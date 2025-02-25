import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityformComponent } from './activityform.component';

describe('ActivityformComponent', () => {
  let component: ActivityformComponent;
  let fixture: ComponentFixture<ActivityformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
