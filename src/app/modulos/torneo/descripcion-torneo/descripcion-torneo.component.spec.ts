import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionTorneoComponent } from './descripcion-torneo.component';

describe('DescripcionTorneoComponent', () => {
  let component: DescripcionTorneoComponent;
  let fixture: ComponentFixture<DescripcionTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescripcionTorneoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescripcionTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
