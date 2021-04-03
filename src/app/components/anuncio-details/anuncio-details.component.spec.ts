import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioDetailsComponent } from './anuncio-details.component';

describe('AnuncioDetailsComponent', () => {
  let component: AnuncioDetailsComponent;
  let fixture: ComponentFixture<AnuncioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
