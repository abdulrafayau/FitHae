import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeAnimation } from './three-animation';

describe('ThreeAnimation', () => {
  let component: ThreeAnimation;
  let fixture: ComponentFixture<ThreeAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeAnimation],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeAnimation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
