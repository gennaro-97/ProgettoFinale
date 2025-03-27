import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskDelGiornoComponent } from './user-task-del-giorno.component';

describe('UserTaskDelGiornoComponent', () => {
  let component: UserTaskDelGiornoComponent;
  let fixture: ComponentFixture<UserTaskDelGiornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskDelGiornoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskDelGiornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
