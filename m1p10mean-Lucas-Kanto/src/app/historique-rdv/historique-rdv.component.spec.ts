import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRDVComponent } from './historique-rdv.component';

describe('HistoriqueRDVComponent', () => {
  let component: HistoriqueRDVComponent;
  let fixture: ComponentFixture<HistoriqueRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueRDVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
