import { IParseQrResult } from '@app/common/interfaces/parse-qr.interface';
import {
  Body,
  Controller,
  GatewayTimeoutException,
  Get,
  Post,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  TimeoutError,
} from 'rxjs';
import { CoreService } from './core.service';
import { ParseQrDto } from './dto/parse-qr.dto';


@Controller('parse-qr')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}
  
  @Post()
  parseQr(@Body() parseQr: ParseQrDto): Observable<IParseQrResult> {
    return this.coreService.parseQr(parseQr).pipe(
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new GatewayTimeoutException(
                'Превышено время ожидания ответа от сервиса.',
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
