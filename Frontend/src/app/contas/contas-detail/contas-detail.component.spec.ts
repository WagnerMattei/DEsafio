import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasDetailComponent } from './contas-detail.component';

describe('ContasDetailComponent', () => {
  let component: ContasDetailComponent;
  let fixture: ComponentFixture<ContasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
