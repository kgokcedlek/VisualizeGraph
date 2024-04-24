import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { By } from '@angular/platform-browser';
import { HtmlParser } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let debugElement: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PopupComponent,
        MatDialogModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the pop-up when showPopUp is true', () => {
    component.showPopUp = true;
    component.nodeInfo = { name: 'Test Node', description: 'Test Description' };
    fixture.detectChanges(); // Trigger Angular change detection

    const popUpElement = debugElement.query(By.css('.popUpContainer')); // Query the pop-up container
    expect(popUpElement).toBeTruthy(); 
  });

  it('should call closeDialog when the close button is clicked', () => {
    spyOn(component, 'closeDialog');

    component.showPopUp = true;
    fixture.detectChanges();

    const closeButton = debugElement.query(By.css('.action > button[mat-button]')); // Query the close button
    closeButton.triggerEventHandler('click', null); // button click event
    fixture.detectChanges(); // Update the component

    expect(component.closeDialog).toHaveBeenCalled(); // Assert that the method was called
  });

});
