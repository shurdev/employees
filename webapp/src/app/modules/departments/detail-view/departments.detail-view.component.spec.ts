import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsDetailViewComponent } from './departments.detail-view.component';

describe('DepartmentsDetailViewComponent', () => {
  let component: DepartmentsDetailViewComponent;
  let fixture: ComponentFixture<DepartmentsDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
