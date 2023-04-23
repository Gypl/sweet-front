import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyShopOverviewComponent } from './candy-shop-overview.component';

describe('CandyShopOverviewComponent', () => {
  let component: CandyShopOverviewComponent;
  let fixture: ComponentFixture<CandyShopOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandyShopOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandyShopOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
