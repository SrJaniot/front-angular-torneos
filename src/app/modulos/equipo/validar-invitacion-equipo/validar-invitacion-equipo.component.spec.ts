import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarInvitacionEquipoComponent } from './validar-invitacion-equipo.component';

describe('ValidarInvitacionEquipoComponent', () => {
  let component: ValidarInvitacionEquipoComponent;
  let fixture: ComponentFixture<ValidarInvitacionEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarInvitacionEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarInvitacionEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
