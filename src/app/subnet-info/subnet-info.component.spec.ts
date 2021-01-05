import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetInfoComponent } from './subnet-info.component';

describe('SubnetInfoComponent', () => {
  let component: SubnetInfoComponent;
  let fixture: ComponentFixture<SubnetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubnetInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
