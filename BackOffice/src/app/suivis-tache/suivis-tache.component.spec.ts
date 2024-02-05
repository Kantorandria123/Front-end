import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivisTacheComponent } from './suivis-tache.component';

describe('SuivisTacheComponent', () => {
  let component: SuivisTacheComponent;
  let fixture: ComponentFixture<SuivisTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuivisTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuivisTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
