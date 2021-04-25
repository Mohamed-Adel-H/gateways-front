import {HttpClient} from '@angular/common/http';
import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {GatewayApis} from '../apis/GatewayApis';
import {Device, Gateway, GatewayPopupData} from '../apis/models';
import {MatDialog} from '@angular/material/dialog';
import {GatewayPopupComponent} from './gateway-popup/gateway-popup.component';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['serialNumber', 'name', 'ipv4', 'actions'];
  displayedDetailsColumns: string[] = ['uid', 'vendor', 'created', 'status'];
  gatewayService: GatewayApis | null;
  expandedElement: Device | null;
  devices: Device[] = [];

  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  result: Gateway[];
  popup: GatewayPopupData = {
    Ipv4: '',
    Name: '',
    SerialNumber: '',
  };

  constructor(private httpClient: HttpClient, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  updateTableModel(): void {
    this.gatewayService.getGateways(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.result = data.content;
      this.resultsLength = data.totalElements;
      this.changeDetectorRefs.detectChanges();
    });
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.gatewayService = new GatewayApis(this.httpClient);
    this.updateTableModel();
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  openCreationPopup(): void {
    const createPopupRef = this.dialog.open(GatewayPopupComponent, {
      width: '250px',
      data: {name: this.popup.Name, ipv4: this.popup.Ipv4, serialNumber: this.popup.SerialNumber}
    });

    createPopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gatewayService.createGateway(result).subscribe(response => {
          this.updateTableModel();

        });
      }
    });
  }

  openUpdatePopup(currentRow: Gateway): void {
    const updatePopupRef = this.dialog.open(GatewayPopupComponent, {
      width: '250px',
      data: {name: currentRow.name, ipv4: currentRow.ipv4, serialNumber: currentRow.serialNumber, id: currentRow.id}
    });

    updatePopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gatewayService.updateGateWay(result).subscribe(response => {
          this.updateTableModel();
        });
      }
    });
  }

  deleteGateway(currentRow: Gateway): void {
    if (currentRow !== undefined) {
      this.gatewayService.deleteGateway(currentRow).subscribe(response => {
        this.updateTableModel();
      });
    }
  }

  openDetails(row: Gateway): any {
    this.gatewayService.getGatewayDevices(row).subscribe(devices => {
      this.devices = devices.content;
    });
    return row;
  }

  closeDetails(row): string {
    return null;
  }
}



