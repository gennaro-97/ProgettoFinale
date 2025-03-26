import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiutenteComponent } from './datiutente.component';

describe('DatiutenteComponent', () => {
  let component: DatiutenteComponent;
  let fixture: ComponentFixture<DatiutenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatiutenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatiutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
