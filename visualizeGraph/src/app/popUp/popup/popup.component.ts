import { Component, Input } from '@angular/core';
import { NodeDetails } from '../../models/tree-node-model';
import { PopupService } from '../../services/popup.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() nodeInfo!:NodeDetails;
  _popUpService!:PopupService

  constructor(popupService:PopupService){
    this._popUpService=popupService;
  }

  closeDialog()
  {
    this._popUpService.closePopup();
  }
}
