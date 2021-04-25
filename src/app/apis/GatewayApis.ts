import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable, GatewayResponse, GatewayPopupData, Gateway} from './models';

export class GatewayApis {
  href = 'http://localhost:8080/gateways';

  constructor(private httpClient: HttpClient) {
  }

  getGateways(sort: string, order: string, page: number, pageSize: number): Observable<GatewayResponse> {
    const pageable: Pageable = {
      pageNumber: page,
      pageSize,
      sort: sort + ',' + order,
    };
    const requestUrl =
      `${(this.href)}?sort=${pageable.sort}&pageSize=${pageable.pageSize}&pageNumber=${pageable.pageNumber}`;

    return this.httpClient.get<GatewayResponse>(requestUrl);
  }

  createGateway(data: GatewayPopupData): Observable<Gateway> {
    return this.httpClient.post<Gateway>(this.href, data);
  }

  deleteGateway(gateway: Gateway): Observable<any> {
    return this.httpClient.delete(this.href + '/' + gateway.id);
  }

  updateGateWay(gateway: Gateway): Observable<Gateway> {
    return this.httpClient.put<Gateway>(this.href + '/' + gateway.id, gateway);
  }
}
