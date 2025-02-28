import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isAfter, isValid, parse } from 'date-fns';
@ValidatorConstraint({ name: 'QrUrlValidator', async: false })
export class QrUrlValidator implements ValidatorConstraintInterface {
  validate(qr: string, args: ValidationArguments) {
    try {
      const parsedUrl = new URL(qr);

      const fn = parsedUrl.searchParams.get('fn');
      const i = parsedUrl.searchParams.get('i');
      const fp = parsedUrl.searchParams.get('fp');
      const t = parsedUrl.searchParams.get('t');
      const s = parsedUrl.searchParams.get('s');
      const n = parsedUrl.searchParams.get('n');

      //Фискальный номер - 16-значное число
      if (!fn || !/^\d{16}$/.test(fn)) return false;

      //Номер документа - до 10 цифр
      if (!i || !/^\d{1,10}$/.test(i)) return false;

      //Фискальный признак документа - 10-значное число
      if (!fp || !/^\d{10}$/.test(fp)) return false;

      // Сумма чека в рублях (целая или десятичная с 1 или 2 знаками после запятой)
      if (!s || !/^\d+(\.\d{1,2})?$/.test(s)) return false; //

      // Целое число > 0
      if (!n || !/^\d+$/.test(n) || parseInt(n) <= 0) return false;

      //Дата и время чека формата YYYYMMDDTHHMMSS и меньше текущей даты
      const parsedDate = parse(t, "yyyyMMdd'T'HHmmss", new Date());
      if (!isValid(parsedDate) || isAfter(parsedDate, new Date())) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Параметры url имеют недопустимый формат (fn, i, fp, t, s, n).';
  }
}
