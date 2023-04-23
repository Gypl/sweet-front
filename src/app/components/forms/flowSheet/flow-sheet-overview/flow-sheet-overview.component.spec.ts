import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowSheetOverviewComponent } from './flow-sheet-overview.component';

describe('FlowSheetOverviewComponent', () => {
  let component: FlowSheetOverviewComponent;
  let fixture: ComponentFixture<FlowSheetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowSheetOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowSheetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
