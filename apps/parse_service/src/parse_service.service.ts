import appendParamsFromSourceUrlToTargetUrl from '@app/common/helpers/appendParamsFromSourceUrlToTargetUrl';
import { IParseQrResult } from '@app/common/interfaces/parse-qr.interface';
import { ITicketResponse } from '@app/common/interfaces/ticket-response.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ParseQrDto } from './dto/parse-qr.dto';

@Injectable()
export class ParseServiceService {
  constructor(private readonly httpService: HttpService) {}

  handleQrParsed(parseQr: ParseQrDto): Observable<IParseQrResult> {
    try {
      const serverBaseApiUrl = 'https://consumer.1-ofd.ru/api/tickets/ticket/';
      const serverApiUrl = appendParamsFromSourceUrlToTargetUrl(
        parseQr.qr,
        serverBaseApiUrl,
      );

      return this.httpService.get<ITicketResponse>(serverApiUrl).pipe(
        map((response) => {
          const { data } = response;
          const {
            ticket: { items, totalSum, userInn },
            orgTitle,
          } = data;
          const formattedData: IParseQrResult = {
            userInn,
            totalSum,
            orgTitle,
            items,
          };
          return formattedData;
        }),
      );
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
