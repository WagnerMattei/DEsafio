import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesDetailComponent } from './transacoes-detail.component';

describe('TransacoesDetailComponent', () => {
  let component: TransacoesDetailComponent;
  let fixture: ComponentFixture<TransacoesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransacoesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacoesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
