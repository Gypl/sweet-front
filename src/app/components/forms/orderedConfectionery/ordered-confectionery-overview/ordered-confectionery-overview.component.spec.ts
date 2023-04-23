import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedConfectioneryOverviewComponent } from './ordered-confectionery-overview.component';

describe('OrderedConfectioneryOverviewComponent', () => {
  let component: OrderedConfectioneryOverviewComponent;
  let fixture: ComponentFixture<OrderedConfectioneryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedConfectioneryOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedConfectioneryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
