import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesFormComponent } from './transacoes-form.component';

describe('TransacoesFormComponent', () => {
  let component: TransacoesFormComponent;
  let fixture: ComponentFixture<TransacoesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransacoesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
