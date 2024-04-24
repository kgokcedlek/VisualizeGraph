import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeDetails } from '../../models/tree-node-model';
import { PopupService } from '../../services/popup.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  _nodeInfo: NodeDetails = { name: "", description: "" };
  _showPopUp: boolean = false;
  _popUpService!: PopupService

  @Output() popUpEvent = new EventEmitter<boolean>;

  @Input() set showPopUp(showDetails: boolean) {
    this._showPopUp = showDetails;
    this.popUpEvent.emit(true);
  };

  @Input() set nodeInfo(nodeInfo: NodeDetails) {
    this._nodeInfo = nodeInfo;
  }

  get nodeInfo(): NodeDetails {
    return this._nodeInfo;
  }

  get showPopUp(): boolean {
    return this._showPopUp
  }

  constructor(popupService: PopupService) {
    this._popUpService = popupService;
  }

  closeDialog() {
    this.showPopUp = false;
    this.popUpEvent.emit(false);
    this._popUpService.closePopup();
  }

}
