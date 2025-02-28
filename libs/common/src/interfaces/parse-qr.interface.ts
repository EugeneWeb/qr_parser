import { ITicket } from './ticket-response.interface';

export interface IParseQrResult extends ITicket {
  orgTitle: string;
}
