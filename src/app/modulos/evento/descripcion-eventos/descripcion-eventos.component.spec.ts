import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionEventosComponent } from './descripcion-eventos.component';

describe('DescripcionEventosComponent', () => {
  let component: DescripcionEventosComponent;
  let fixture: ComponentFixture<DescripcionEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescripcionEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescripcionEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
