import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPrivadaComponent } from './plantilla-privada.component';

describe('PlantillaPrivadaComponent', () => {
  let component: PlantillaPrivadaComponent;
  let fixture: ComponentFixture<PlantillaPrivadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaPrivadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaPrivadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
