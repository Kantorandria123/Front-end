import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MespreferencesComponent } from './mespreferences.component';

describe('MespreferencesComponent', () => {
  let component: MespreferencesComponent;
  let fixture: ComponentFixture<MespreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MespreferencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MespreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
