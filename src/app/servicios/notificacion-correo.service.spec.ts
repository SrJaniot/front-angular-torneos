import { TestBed } from '@angular/core/testing';

import { NotificacionCorreoService } from './notificacion-correo.service';

describe('NotificacionCorreoService', () => {
  let service: NotificacionCorreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionCorreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
