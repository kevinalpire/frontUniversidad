import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMateriaGestionComponent } from './gestion-materia-gestion.component';

describe('GestionMateriaGestionComponent', () => {
  let component: GestionMateriaGestionComponent;
  let fixture: ComponentFixture<GestionMateriaGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMateriaGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionMateriaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
