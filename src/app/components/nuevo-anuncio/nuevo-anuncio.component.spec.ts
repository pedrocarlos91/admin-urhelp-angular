import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAnuncioComponent } from './nuevo-anuncio.component';

describe('NuevoAnuncioComponent', () => {
  let component: NuevoAnuncioComponent;
  let fixture: ComponentFixture<NuevoAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
