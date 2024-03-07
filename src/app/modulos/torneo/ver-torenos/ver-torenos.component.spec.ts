import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTorenosComponent } from './ver-torenos.component';

describe('VerTorenosComponent', () => {
  let component: VerTorenosComponent;
  let fixture: ComponentFixture<VerTorenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerTorenosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerTorenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
