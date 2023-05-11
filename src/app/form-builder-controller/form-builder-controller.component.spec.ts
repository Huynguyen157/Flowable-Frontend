import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderControllerComponent } from './form-builder-controller.component';

describe('FormBuilderControllerComponent', () => {
  let component: FormBuilderControllerComponent;
  let fixture: ComponentFixture<FormBuilderControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuilderControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBuilderControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
