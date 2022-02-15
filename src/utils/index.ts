export const resolveNestedAtribute = (obj: any, path: string) => {
  return path
    .split('.') // split string based on `.`
    .reduce(function (o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, obj); // set initial value as object
};

export const timeSanitizer = (time: number) => (time <= 9 ? `0${time}` : time);

export function formatMoney(number: number, currency = null) {
  return `${Number.parseFloat(number.toString()).toLocaleString('pt', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MT`;
}

export const calcPercentage = (acc: number, total: number) =>
  ((acc * 100) / total).toFixed(2);
