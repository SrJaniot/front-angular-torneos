import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdenificarCodigoTowfaComponent } from './idenificar-codigo-towfa.component';

describe('IdenificarCodigoTowfaComponent', () => {
  let component: IdenificarCodigoTowfaComponent;
  let fixture: ComponentFixture<IdenificarCodigoTowfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdenificarCodigoTowfaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdenificarCodigoTowfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
