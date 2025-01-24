import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuoptionsComponent } from './menuoptions.component';

describe('MenuoptionsComponent', () => {
  let component: MenuoptionsComponent;
  let fixture: ComponentFixture<MenuoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuoptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
