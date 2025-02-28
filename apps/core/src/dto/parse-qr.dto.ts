import { QrUrlValidator } from "@app/common/validators/qr-url.validator";
import { IsString, IsUrl, Validate } from "class-validator";

export class ParseQrDto {
    @IsString({message: ''})
    @IsUrl({host_whitelist: ['consumer.1-ofd.ru']}, {message: 'Указан не верный формат url или введен недопустимый хост.'})
    @Validate(QrUrlValidator)
    qr: string
}