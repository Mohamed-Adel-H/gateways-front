import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  serialNumber: string;
  name: string;
  ipv4: string;
}

@Component({
  selector: 'app-gateway-popup',
  templateUrl: './gateway-popup.component.html',
  styleUrls: ['./gateway-popup.component.css']
})
export class GatewayPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GatewayPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
