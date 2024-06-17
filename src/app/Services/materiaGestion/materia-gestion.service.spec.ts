import { TestBed } from '@angular/core/testing';

import { MateriaGestionService } from './MateriaGestionService';

describe('MateriaGestionService', () => {
  let service: MateriaGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
