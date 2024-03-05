import { TestBed } from '@angular/core/testing';

import { NotificacionWhatsappService } from './notificacion-whatsapp.service';

describe('NotificacionWhatsappService', () => {
  let service: NotificacionWhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionWhatsappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
