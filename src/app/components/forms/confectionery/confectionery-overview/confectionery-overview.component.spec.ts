import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfectioneryOverviewComponent } from './confectionery-overview.component';

describe('ConfectioneryOverviewComponent', () => {
  let component: ConfectioneryOverviewComponent;
  let fixture: ComponentFixture<ConfectioneryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfectioneryOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfectioneryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
