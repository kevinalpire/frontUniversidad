import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaGestionComponent } from './materia-gestion.component';

describe('MateriaGestionComponent', () => {
  let component: MateriaGestionComponent;
  let fixture: ComponentFixture<MateriaGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
