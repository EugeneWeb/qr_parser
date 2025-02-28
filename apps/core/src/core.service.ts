import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Observable,
  timeout,
} from 'rxjs';
import { PARSEQR_SERVICE } from './constants/services';
import { ParseQrDto } from './dto/parse-qr.dto';
import { IParseQrResult } from '@app/common/interfaces/parse-qr.interface';

@Injectable()
export class CoreService {
  constructor(
    @Inject(PARSEQR_SERVICE) private rabbitClient: ClientProxy,
  ) {}

  parseQr(parseQr: ParseQrDto): Observable<IParseQrResult> {
    return this.rabbitClient.send({ cmd: 'qr_parsed' }, parseQr).pipe(timeout(5000));
  }
}
