import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuniciposComponent } from './municipos.component';

describe('MuniciposComponent', () => {
  let component: MuniciposComponent;
  let fixture: ComponentFixture<MuniciposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuniciposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuniciposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
