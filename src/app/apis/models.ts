export interface GatewayResponse {
  content: Gateway[];
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: string;
}

export interface Gateway {
  id: number;
  serialNumber: string;
  ipv4: string;
  name: string;
}

export class GatewayPopupData {
  SerialNumber: string;
  Name: string;
  Ipv4: string;
}
