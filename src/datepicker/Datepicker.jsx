import React, { useEffect, useState, useContext } from 'react';
import DatepickerContext from './datepickerContext';

import Config from './Config';

import {
  CALENDAR_WEEK_DAYS,
  THIS_YEAR,
  THIS_MONTH,
  getMonthsObj,
  getMonthDates,
  getEmptyDates,
  getTodayDate,
  getYearAfterDiff,
  getMonthAfterDiff,
  calcIsLastMonth,
} from './helpers/calendar';

import './datepicker.css';

function Datepicker() {
  const date_picker_context = useContext(DatepickerContext);

  const [monthDates, setMonthDates] = useState(getMonthDates());
  const [emptyDates, setEmptyDates] = useState(getEmptyDates());
  const [currentMonth, setCurrentMonth] = useState(THIS_MONTH);
  const [currentYear, setCurrentYear] = useState(THIS_YEAR);
  const [dropdownIsShow, setDropdownIsShow] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState('');

  const [displayMonths, setDisplayMonths] = useState([]);
  const [monthsForDropdown, setMonthsForDropdown] = useState(
    getMonthsObj(date_picker_context.maxMonths)
  );

  useEffect(() => {
    const { monthDisplayStyle } = date_picker_context;
    const value_of_months = [];
    // GET DATES OBJ TO DISPLAY AT DROPDOWN AS MONTH AND YEAR
    setDisplayMonths(
      Object.entries(monthsForDropdown).map((month_dropdown) => {
        let month_for_display = month_dropdown[1].toLocaleString('default', {
          month: monthDisplayStyle || 'long',
        });
        month_for_display += ' ' + month_dropdown[1].getFullYear();
        value_of_months.push([
          month_dropdown[1].getFullYear(),
          month_dropdown[1].getMonth(),
        ]);
        return month_for_display;
      })
    );

    if (dropdownTitle || !monthsForDropdown[0]) return;
    // DEFAULT HEADLINE / TITLE :
    setDropdownTitle(
      monthsForDropdown[0].toLocaleString('default', { month: 'long' }) +
        ' ' +
        monthsForDropdown[0].getFullYear()
    );
  }, []);

  // GENERAL DROPDOWN
  const openDropdown = () => {
    setDropdownIsShow(!dropdownIsShow);
  };

  const closeDropdown = () => {
    dropdownIsShow && setDropdownIsShow(false);
  };

  const isFirstMonth = () => {
    return currentMonth === THIS_MONTH && currentYear === THIS_YEAR;
  };

  const isLastMonth = () => {
    const { maxMonths } = date_picker_context;
    return calcIsLastMonth(currentMonth, currentYear, maxMonths);
    // return currentMonth === THIS_MONTH && currentYear !== THIS_YEAR;
  };

  const isBlockedDay = (i) => {
    const { blockedDats } = date_picker_context;
    i++; // location 0 is really 1st of the month
    return (
      (blockedDats &&
        blockedDats.find(
          (item) =>
            item.dd === i && item.mm === currentMonth && item.yy === currentYear
        )) ||
      (THIS_YEAR === currentYear &&
        THIS_MONTH === currentMonth &&
        i < getTodayDate())
    );
  };

  const handlePickDate = (i) => {
    if (isBlockedDay(i)) return;
    i++;
    let t = new Date(currentYear, currentMonth, i);
    let selectedDate = [currentYear, currentMonth, i];
    // CHECK IF NEED TO CLEAR IT (DOUBLE CLICK ON THE SAME DATE)
    selectedDate =
      date_picker_context.selectedDate[0] === selectedDate[0] &&
      date_picker_context.selectedDate[1] === selectedDate[1] &&
      date_picker_context.selectedDate[2] === selectedDate[2]
        ? []
        : selectedDate;

    date_picker_context.setSelectedDate(selectedDate);
    // RETURN IF WE CLEARED THE DATE :
    if (!selectedDate[0]) return;

    console.log(t); // DISPLAY DATE OBJECT
  };

  // DROPDOWN
  const handlePickMonth = (value) => {
    const [year, month, dropdown_title] = value;
    // CREATE THE DATES :
    setMonthDates(getMonthDates(+month, +year));
    setEmptyDates(getEmptyDates(+month, +year));
    // monthDates,
    // emptyDates,
    setCurrentMonth(+month);
    setCurrentYear(+year);
    setDropdownTitle(dropdown_title);
    // });
  };

  //ARROWS
  const handleMonthArrow = (diff) => {
    // CHEACK IF LAST MONTH OR MORE THAN 12 MONTHS FROM NOW
    if (diff < 0 && isFirstMonth()) return;
    if (diff > 0 && isLastMonth()) return;

    // CALC AND CHANGE MONTH AND YEAR
    let year = getYearAfterDiff(currentYear, currentMonth, diff);
    let month = getMonthAfterDiff(currentMonth, diff);

    //GET THE DATA IN ORDER TO USE: (fn) handlePickMonth
    let m = new Date(year, month, 1);
    let dropdown_title = m.toLocaleString('default', { month: 'long' });
    dropdown_title += ' ' + m.getFullYear();
    const value = [year, month, dropdown_title];
    handlePickMonth(value);
  };

  //titles
  const {
    guideAvailable,
    guide2,
    headline = Config.default_headline,
  } = date_picker_context;
  //state

  return (
    <DatepickerContext.Consumer>
      {({ selectedDate }) => (
        <div
          className="datepicker-container"
          onClick={() => closeDropdown()}
          style={{ direction: 'rtl' }}>
          <div className="close"></div>
          <span className="datepicker-headline">{headline}</span>

          <div className="months-container" onClick={() => openDropdown()}>
            <div className="months-dropdown">
              <span>
                <i
                  className={
                    'dorpdown-arrow ' + (dropdownIsShow ? 'up' : 'down')
                  }></i>
                {dropdownTitle}
              </span>

              <ul
                className={
                  'months-select ' + (dropdownIsShow ? 'show' : 'hide')
                }>
                {displayMonths.map((month, i) => (
                  <li
                    className="month"
                    key={i}
                    onClick={() =>
                      handlePickMonth([
                        monthsForDropdown[i].getFullYear(),
                        monthsForDropdown[i].getMonth(),
                        month,
                      ])
                    }>
                    {month}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="arrows">
            <i
              className={'arrow right ' + (isFirstMonth() ? ' disabeld' : '')}
              onClick={() => handleMonthArrow(-1)}></i>

            <i
              className={'arrow left ' + (isLastMonth() ? ' disabeld' : '')}
              onClick={() => handleMonthArrow(1)}></i>
          </div>

          <div className="calendar">
            <div className="dates">
              {CALENDAR_WEEK_DAYS.map((dayName) => (
                <div className="day" key={dayName}>
                  {dayName}
                </div>
              ))}

              {emptyDates.map((d, i) => (
                <div className="date-number empty" key={i}></div>
              ))}

              {monthDates.map((day, i) => (
                <div
                  className={
                    isBlockedDay(i)
                      ? 'date-number unavailable'
                      : selectedDate &&
                        currentYear === selectedDate[0] &&
                        currentMonth === selectedDate[1] &&
                        day === selectedDate[2]
                      ? 'date-number  available selected'
                      : 'date-number available'
                  }
                  key={i}
                  onClick={() => handlePickDate(i)}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="date-picker guide-container">
            <div className="guide">
              <i className="date-number available"></i>
              <span> {guideAvailable}</span>
            </div>
            <div className="guide">
              <i className="guide-circle charter"></i>
              <span>{guide2}</span>
            </div>
          </div>
        </div>
      )}
    </DatepickerContext.Consumer>
  );
}

Datepicker.contextType = DatepickerContext;
export default Datepicker;
