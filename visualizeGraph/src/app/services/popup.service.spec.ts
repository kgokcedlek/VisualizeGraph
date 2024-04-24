import { TestBed } from '@angular/core/testing';

import { PopupService } from './popup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popUp/popup/popup.component';

describe('PopupService', () => {
  let service: PopupService;
  let  matDialogMock: jasmine.SpyObj<MatDialog>;
  beforeEach(() => {
    const matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    TestBed.configureTestingModule({
      providers:[
        PopupService,
        { provide: MatDialog, useValue: matDialog }
      ]
    });
    service = TestBed.inject(PopupService);
    matDialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a popup', () => {
    service.openPopup(); // Call the service method
    expect(matDialogMock.open).toHaveBeenCalledWith(PopupComponent); // Verify MatDialog.open was called with PopupComponent
  });

  it('should close all popups', () => {
    service.closePopup(); // Call the service method
    expect(matDialogMock.closeAll).toHaveBeenCalled(); // Verify MatDialog.closeAll was called
  });
});
