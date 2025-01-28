import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePopComponent } from './cookie-pop.component';

describe('CookiePopComponent', () => {
  let component: CookiePopComponent;
  let fixture: ComponentFixture<CookiePopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
