import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioEditComponent } from './anuncio-edit.component';

describe('AnuncioEditComponent', () => {
  let component: AnuncioEditComponent;
  let fixture: ComponentFixture<AnuncioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
