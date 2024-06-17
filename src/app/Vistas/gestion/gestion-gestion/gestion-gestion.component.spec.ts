import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGestionComponent } from './gestion-gestion.component';

describe('GestionGestionComponent', () => {
  let component: GestionGestionComponent;
  let fixture: ComponentFixture<GestionGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
