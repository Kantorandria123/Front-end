import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrespecialeComponent } from './offrespeciale.component';

describe('OffrespecialeComponent', () => {
  let component: OffrespecialeComponent;
  let fixture: ComponentFixture<OffrespecialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffrespecialeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffrespecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
