import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTrendComponent } from './risk-trend.component';

describe('RiskTrendComponent', () => {
  let component: RiskTrendComponent;
  let fixture: ComponentFixture<RiskTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
