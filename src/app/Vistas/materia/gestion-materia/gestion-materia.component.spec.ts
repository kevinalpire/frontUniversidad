import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMateriaComponent } from './gestion-materia.component';

describe('GestionMateriaComponent', () => {
  let component: GestionMateriaComponent;
  let fixture: ComponentFixture<GestionMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
