import { Injectable } from '@angular/core';
import { PopupComponent } from '../popUp/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(PopupComponent);
  }
  closePopup() {
    this.dialog.closeAll();
  }
}
