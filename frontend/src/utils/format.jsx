import numeral from 'numeral';
import { format} from 'date-fns';


export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
    return numeral(number).format('0.00a').replace('.00', '');
  }

export function fDate(date) {
  return format(new Date(date), 'dd MMM yyyy');
}
