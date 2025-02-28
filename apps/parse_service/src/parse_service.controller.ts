import { RmqService } from '@app/common';
import { IParseQrResult } from '@app/common/interfaces/parse-qr.interface';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext
} from '@nestjs/microservices';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ParseQrDto } from './dto/parse-qr.dto';
import { ParseServiceService } from './parse_service.service';

@Controller()
export class ParseServiceController {
  constructor(
    private readonly parseServiceService: ParseServiceService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'qr_parsed' })
  handleQrParsed(
    @Payload() parseQr: ParseQrDto,
    @Ctx() context: RmqContext,
  ): Observable<IParseQrResult> {
    return this.parseServiceService.handleQrParsed(parseQr).pipe(
      tap(() => this.rmqService.ack(context)),
      catchError((error) => {
        console.error('Ошибка при обработке QR:', error);
        return throwError(() => error);
      }),
    );
  }
}
