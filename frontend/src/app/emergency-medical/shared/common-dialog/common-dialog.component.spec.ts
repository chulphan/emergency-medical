import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialogComponent } from './common-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CommonDialogComponent', () => {
  let component: CommonDialogComponent;
  let fixture: ComponentFixture<CommonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommonDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data object is received safely', () => {
    // expect(component).data is not null..
    // const commonDialogComponent = new CommonDialogComponent(
    //   new MatDialogRef(), { searchPhrase: 'test', searchList: ['a'] }
    // );
    // expect(commonDialogComponent.data).toBeNull(false);
  });

  it('entire data in data object are not null', () => {
    // expect(component).data.searchPhrase is not null
    // expect(component).data.searchResult is not null
  })
});
