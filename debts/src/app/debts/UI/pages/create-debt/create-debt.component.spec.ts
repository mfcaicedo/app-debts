import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebtComponent } from './create-debt.component';

describe('CreateDebtComponent', () => {
  let component: CreateDebtComponent;
  let fixture: ComponentFixture<CreateDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDebtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
