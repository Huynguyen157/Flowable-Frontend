import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControllerComponent } from './edit-controller.component';

describe('EditControllerComponent', () => {
  let component: EditControllerComponent;
  let fixture: ComponentFixture<EditControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
