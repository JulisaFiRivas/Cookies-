import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePoliticasComponent } from './cookie-politicas.component';

describe('CookiePoliticasComponent', () => {
  let component: CookiePoliticasComponent;
  let fixture: ComponentFixture<CookiePoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePoliticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
