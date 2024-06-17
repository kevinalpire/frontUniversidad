import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAulaComponent } from './gestion-aula.component';

describe('GestionAulaComponent', () => {
  let component: GestionAulaComponent;
  let fixture: ComponentFixture<GestionAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
