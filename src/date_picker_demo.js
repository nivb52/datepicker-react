export const guide1_En = 'Departure and return dates are possible';
export const guide2_En = 'Possibility of charter flights on these dates';
export const headline_En = 'Exit Date';

export const guide1_He = 'תאריכי יציאה וחזרה אפשריים';
export const guide2_He = `אפשרות טיסת צ'רטר בתאריכים אלו`;
export const headline_He = 'תאריך יציאה';

const d = new Date();
const mm = d.getMonth() === 11 ? 0 : d.getMonth() + 1;
export const blockedDats = [
  { dd: 2, mm, yy: 2021 },
  { dd: 4, mm, yy: 2021 },
  { dd: 6, mm, yy: 2021 },
  { dd: 8, mm, yy: 2021 },
  { dd: 10, mm, yy: 2021 },
  { dd: 12, mm, yy: 2021 },
  { dd: 19, mm, yy: 2021 },
  { dd: 27, mm, yy: 2021 },
  { dd: 28, mm, yy: 2021 },
];
