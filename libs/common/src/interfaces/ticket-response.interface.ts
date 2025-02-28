export interface ITicketResponse {
    ticket: ITicket
    orgTitle: string
}
export interface ITicket {
  userInn: string,
  totalSum: number,
  items: ITicketPurchase;
}

export interface ITicketPurchase {
  options: {
    quantity: string;
    name: string;
    sum: string;
    price: string;
    ndsRate: string;
    calculationSubjectSign: string;
    calculationTypeSign: string;
  };
  quantity: number;
  price: number;
  ndsRate: number;
  taxes: ITicketTaxes[]
  calculationSubjectSign: number;
  calculationTypeSign: number;
  name: string;
  sum: number;
  industryReceiptRequisite: any[];
}

export interface ITicketTaxes {
  layout: {
    type: string;
    printedName: string;
    rate: number;
  };
}

