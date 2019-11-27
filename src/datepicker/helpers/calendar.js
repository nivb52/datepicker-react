// Week days display names
const Lang = navigator.language || "he-IL"; // if navigator is not supported
const WEEK_DAYS_HE = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
const WEEK_DAYS_EN = ["Sun", "Mon", "Thu", "Wen", "The", "Fri", "Sat"];
export const CALENDAR_WEEK_DAYS =
  Lang === "he-IL" ? WEEK_DAYS_HE : WEEK_DAYS_EN;

// init =>  current year
export const THIS_YEAR = +new Date().getFullYear();

// init =>  current month (from 0 January - 11 December)
export const THIS_MONTH = +new Date().getMonth();

// init => First day of the month : from 1 - 7
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  let t = new Date(year, month, 1);
  return +t.getDay();
};

// init => Today
export const getTodayDate = () => {
  let t = new Date();
  return +t.getDate();
};

// init 1 year of calendar month =>
export const getMonthsObj = (monthsToInit = 12, month = THIS_MONTH, year = THIS_YEAR) => {
  const months = {};
  for (let i = 0; i < monthsToInit; i++) {
    months[i] = new Date(year, month, 1);
    if (month < 11) month++;
    else {
      month = 0;
      year++;
    }
  }
  return months;
};

export const CALENDAR_MONTHS = getMonthsObj();

// init => Number days in a month for a given year from 28 - 31
const _calcMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [3, 5, 8, 10]; //3 => is 4 = APRIL ...
  const leapYear = year % 4 === 0;
  // February: 28 or 29
  if (month === 1) return leapYear ? 29 : 28;
  // OTHER MONTHS
  else return months30.includes(month) ? 30 : 31;
};

export const getEmptyDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  let firstMonthDate = getMonthFirstDay(month, year);
  const emptyDates = [];
  for (let i = 1; i < firstMonthDate; i++) {
    emptyDates.push("");
  }
  return emptyDates;
};

export const getMonthDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = [];
  let totalMonthDays = _calcMonthDays(month, year);
  for (let i = 1; i <= totalMonthDays; i++) {
    monthDays.push(i);
  }

  return monthDays;
};

const _isNextMonth = (month,diff) => {return month === 11 && diff > 0}
const _isPrevMonth = (month,diff) => {return month === 0 && diff < 0}

export const getYearAfterDiff = (year, month, diff) => {
  return _isNextMonth(month,diff)
    ? year + 1
    : _isPrevMonth(month,diff)
    ? year - 1
    : year;
};

export const getMonthAfterDiff = (month,diff) => {
  return _isNextMonth(month,diff)
  ? 0
  : _isPrevMonth(month,diff)
  ? 11
  : month + diff;
}

export const isLastMonth = (month,year, maxDiffAllowed) => {
  const yearDiff = (year - THIS_YEAR)
  const diff = (yearDiff * 11) + month - (THIS_MONTH)
  return (maxDiffAllowed - 2) <= diff ? true : false
}
