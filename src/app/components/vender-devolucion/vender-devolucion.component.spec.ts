import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderDevolucionComponent } from './vender-devolucion.component';

describe('VenderDevolucionComponent', () => {
  let component: VenderDevolucionComponent;
  let fixture: ComponentFixture<VenderDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenderDevolucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenderDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
