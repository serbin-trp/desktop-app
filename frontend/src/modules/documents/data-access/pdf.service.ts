import { Injectable } from '@angular/core';
import htmlTemplate from '@utils/html/template';
import rowTemplate from '@utils/html/row';
import juice from 'juice';
import { IClient } from '@modules/clients/models/client.model';
import { sum } from '@utils/math';
import { api } from '@wails/models';

const trxTitle = {
  first: "Комп'ютерне програмування",
  else: "Додаткове комп'ютерне програмування",
};

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  replace(doc: api.Document): Promise<string> {
    return new Promise((resolve) => {
      const rows = doc.transactions.map(replaceRow);
      const withValues = htmlTemplate
        .replaceAll('{{docTitle}}', doc.title)
        .replaceAll('{{executorTitle}}', `ФОП "${doc.executor.title}"`)
        .replaceAll('{{contractorTitle}}', `ФОП "${doc.contractor.title}"`)
        .replaceAll('{{executorIPN}}', doc.executor.ipn)
        .replaceAll('{{contractorIPN}}', doc.contractor.ipn)
        .replaceAll('{{executorAddress}}', doc.executor.address)
        .replaceAll('{{contractorAddress}}', doc.contractor.address)
        .replaceAll('{{executorAccount}}', doc.executor.account)
        .replaceAll('{{contractorAccount}}', doc.contractor.account)
        .replaceAll('{{executorPhone}}', doc.executor.phone)
        .replaceAll('{{contractorPhone}}', doc.contractor.phone)
        .replaceAll('{{docDate}}', doc.date)
        .replaceAll('<section id="replaceWithTRX"></section>', rows.join(''))
        .replaceAll('{{trxAmount}}', doc.transactions.length.toString())
        .replaceAll('{{trxSum}}', trxSum(doc.transactions).toString())
        .replaceAll('{{trxSumWords}}', getTrxText(doc.transactions))
        .replaceAll('{{executorInitials}}', `/${getInitials(doc.executor)}`)
        .replaceAll(
          '{{contractorInitials}}',
          `/${getInitials(doc.contractor)}`,
        );

      resolve(juice(withValues));
    });
  }
}

function getTrxText(trxs: api.DocTransaction[]) {
  const sum = trxSum(trxs);
  return numberToUkrainianText(parseFloat(sum));
}

function replaceRow(trx: api.DocTransaction, i: number) {
  return rowTemplate
    .replaceAll('{{trxIndex}}', (i + 1).toString())
    .replaceAll('{{trxTitle}}', i === 0 ? trxTitle.first : trxTitle.else)
    .replaceAll('{{trxAmount}}', trx.amount);
}

function trxSum(trx: api.DocTransaction[]): string {
  return trx.reduce((v, a) => sum(v, a.amount), '0');
}

function getInitials(c: IClient) {
  return `${c.lastName} ${c.firstName[0]}.${c.fathersName[0]}.`;
}

function numberToUkrainianText(number: number): string {
  const units: string[] = [
    'нуль',
    'один',
    'два',
    'три',
    'чотири',
    "п'ять",
    'шість',
    'сім',
    'вісім',
    "дев'ять",
  ];
  const unitsFeminine: string[] = [
    'нуль',
    'одна',
    'дві',
    'три',
    'чотири',
    "п'ять",
    'шість',
    'сім',
    'вісім',
    "дев'ять",
  ];
  const teens: string[] = [
    'десять',
    'одинадцять',
    'дванадцять',
    'тринадцять',
    'чотирнадцять',
    "п'ятнадцять",
    'шістнадцять',
    'сімнадцять',
    'вісімнадцять',
    "дев'ятнадцять",
  ];
  const tens: string[] = [
    '',
    'десять',
    'двадцять',
    'тридцять',
    'сорок',
    "п'ятдесят",
    'шістдесят',
    'сімдесят',
    'вісімдесят',
    "дев'яносто",
  ];
  const hundreds: string[] = [
    '',
    'сто',
    'двісті',
    'триста',
    'чотириста',
    "п'ятсот",
    'шістсот',
    'сімсот',
    'вісімсот',
    "дев'ятсот",
  ];
  const thousandsForms: string[] = ['тисяча', 'тисячі', 'тисяч'];
  const hryvniaForms: string[] = ['гривня', 'гривні', 'гривень'];
  const kopiykaForms: string[] = ['копійка', 'копійки', 'копійок'];

  function getUnitText(num: number, feminine: boolean = false): string {
    return feminine ? unitsFeminine[num] : units[num];
  }

  function getTensText(num: number, feminine: boolean = false): string {
    if (num < 10) return getUnitText(num, feminine);
    if (num < 20) return teens[num - 10];
    const tensPart = Math.floor(num / 10);
    const unitPart = num % 10;
    return (
      tens[tensPart] + (unitPart ? ' ' + getUnitText(unitPart, feminine) : '')
    );
  }

  function getHundredsText(num: number): string {
    const hundredsPart = Math.floor(num / 100);
    const rest = num % 100;
    return hundreds[hundredsPart] + (rest ? ' ' + getTensText(rest) : '');
  }

  function getThousandsText(num: number): string {
    const thousandsPart = Math.floor(num / 1000);
    const rest = num % 1000;
    let thousandText = '';

    const thousandsRemainder = thousandsPart % 10;
    const thousandsTens = thousandsPart % 100;

    if (thousandsTens >= 11 && thousandsTens <= 19) {
      thousandText = getTensText(thousandsPart) + ' ' + thousandsForms[2];
    } else if (thousandsRemainder === 1) {
      thousandText = getTensText(thousandsPart, true) + ' ' + thousandsForms[0];
    } else if (thousandsRemainder >= 2 && thousandsRemainder <= 4) {
      thousandText = getTensText(thousandsPart, true) + ' ' + thousandsForms[1];
    } else {
      thousandText = getTensText(thousandsPart) + ' ' + thousandsForms[2];
    }

    return thousandText + (rest ? ' ' + getHundredsText(rest) : '');
  }

  function getCurrencyText(num: number, forms: string[]): string {
    const remainder = num % 10;
    const tens = num % 100;

    if (tens >= 11 && tens <= 19) {
      return forms[2];
    } else if (remainder === 1) {
      return forms[0];
    } else if (remainder >= 2 && remainder <= 4) {
      return forms[1];
    } else {
      return forms[2];
    }
  }

  function getTextForNumber(num: number, feminine: boolean = false): string {
    if (num < 1000) {
      return getHundredsText(num);
    } else {
      return getThousandsText(num);
    }
  }

  const wholePart = Math.floor(number);
  const fractionalPart = Math.round((number - wholePart) * 100);

  const wholeText = getTextForNumber(wholePart);
  const fractionalText =
    fractionalPart > 0 ? getTextForNumber(fractionalPart, true) : 'нуль';

  const hryvniaText = getCurrencyText(wholePart, hryvniaForms);
  const kopiykaText = getCurrencyText(fractionalPart, kopiykaForms);

  // Correcting gender for the number "два" (two) in the whole part
  const lastTwoDigits = wholePart % 100;
  const feminineWholePart = lastTwoDigits === 2 ? true : false;

  return `${wholeText} ${hryvniaText} ${fractionalText} ${kopiykaText}`;
}
