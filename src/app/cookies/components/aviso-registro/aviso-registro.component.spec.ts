import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoRegistroComponent } from './aviso-registro.component';

describe('AvisoRegistroComponent', () => {
  let component: AvisoRegistroComponent;
  let fixture: ComponentFixture<AvisoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
