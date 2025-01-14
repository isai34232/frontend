import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProveedoresComponent } from './add-edit-proveedores.component';

describe('AddEditProveedoresComponent', () => {
  let component: AddEditProveedoresComponent;
  let fixture: ComponentFixture<AddEditProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
