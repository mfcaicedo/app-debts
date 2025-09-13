import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailDebtComponent } from './view-detail-debt.component';

describe('ViewDetailDebtComponent', () => {
  let component: ViewDetailDebtComponent;
  let fixture: ComponentFixture<ViewDetailDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailDebtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
