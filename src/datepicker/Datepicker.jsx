import React, { Component } from "react";
import DatepickerContext from "./datepickerContext";

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
  isLastMonth
} from "./helpers/calendar";

import "./datepicker.css";

class Datepicker extends Component {
  state = {
    monthDates: getMonthDates(),
    emptyDates: getEmptyDates(),
    month: THIS_MONTH,
    year: THIS_YEAR,
    dropdownIsShow: false,
    dropdownTitle: "",
    monthsForDropdown: [],
    displayMonths: []
  };

  componentDidMount() {
    const valueOfMonths = [];
    const displayMonths = [];
    const { maxMonths } = this.context;
    // GET DATES OBJ TO DISPLAY AT DROPDOWN AS MONTH AND YEAR
    const monthsForDropdown = getMonthsObj(maxMonths);
    const { monthDisplayStyle } = this.context;
    Object.entries(monthsForDropdown).map(month => {
      let m = month[1].toLocaleString("default", {
        month: monthDisplayStyle || "long"
      });
      m += " " + month[1].getFullYear();
      valueOfMonths.push([month[1].getFullYear(), month[1].getMonth()]);
      return displayMonths.push(m);
    });

    this.setState({ monthsForDropdown, displayMonths });
    if (this.state.dropdownTitle || !monthsForDropdown[0]) return;
    // DEFAULT HEADLINE / TITLE :
    const dropdownTitle =
      monthsForDropdown[0].toLocaleString("default", { month: "long" }) +
      " " +
      monthsForDropdown[0].getFullYear();
    this.setState({ dropdownTitle });
  }

  // GENERAL DROPDOWN
  openDropdown = () => {
    this.setState({
      dropdownIsShow: !this.state.dropdownIsShow
    });
  };

  isFirstMonth = () => {
    let { month, year } = this.state;
    return month === THIS_MONTH && year === THIS_YEAR;
  };

  isLastMonth = () => {
    const { month, year } = this.state;
    const { maxMonths } = this.context;
    return isLastMonth(month, year, maxMonths);
    // return month === THIS_MONTH && year !== THIS_YEAR;
  };

  isBlockedDay = i => {
    const { blockedDats } = this.context;
    i++; // location 0 is really 1st of the month
    return (
      (blockedDats &&
        blockedDats.find(
          item =>
            item.dd === i &&
            item.mm === this.state.month &&
            item.yy === this.state.year
        )) ||
      (THIS_YEAR === this.state.year &&
        THIS_MONTH === this.state.month &&
        i < getTodayDate())
    );
  };

  handlePickDate = i => {
    if (this.isBlockedDay(i)) return;
    i++;
    let { month, year } = this.state;
    let t = new Date(year, month, i);
    let selectedDate = [year, month, i];
    // CHECK IF NEED TO CLEAR IT (DOUBLE CLICK ON THE SAME DATE)
    selectedDate =
      this.context.selectedDate[0] === selectedDate[0] &&
      this.context.selectedDate[1] === selectedDate[1] &&
      this.context.selectedDate[2] === selectedDate[2]
        ? []
        : selectedDate;
    this.context.setSelectedDate(selectedDate)
    // RETURN IF WE CLEARED THE DATE :
    if (!selectedDate[0]) return;
    console.log(t); // DISPLAY DATE OBJECT AS REQUESTED
  };

  // DROPDOWN
  handlePickMonth = value => {
    const [year, month, dropdownTitle] = value;
    // CREATE THE DATES :
    const monthDates = getMonthDates(+month, +year);
    const emptyDates = getEmptyDates(+month, +year);
    this.setState({
      monthDates,
      emptyDates,
      month: +month,
      year: +year,
      dropdownTitle
    });
  };

  //ARROWS
  handleMonthArrow = diff => {
    let { month, year } = this.state;

    // CHEACK IF LAST MONTH OR MORE THAN 12 MONTHS FROM NOW
    if (diff < 0 && this.isFirstMonth()) return;
    if (diff > 0 && this.isLastMonth()) return;

    // CALC AND CHANGE MONTH AND YEAR
    year = getYearAfterDiff(year, month, diff);
    month = getMonthAfterDiff(month, diff);

    //GET THE DATA IN ORDER TO USE: (fn) handlePickMonth
    let m = new Date(year, month, 1);
    let dropdownTitle = m.toLocaleString("default", { month: "long" });
    dropdownTitle += " " + m.getFullYear();
    const value = [year, month, dropdownTitle];
    this.handlePickMonth(value);
  };

  render() {
    //titles
    const headline = this.context.headline || "תאריך יציאה";
    const { guideAvailable, guide2 } = this.context;
    //state
    const {
      dropdownIsShow,
      monthsForDropdown,
      displayMonths,
    } = this.state;


    return (
      <DatepickerContext.Consumer>
         {({ selectedDate }) => (
      <div className="datepicker-container" style={{ direction: "rtl" }}>
        <div className="close"></div>
        <span className="datepicker-headline">{headline}</span>

        <div className="months-container">
          <div className="months-dropdown" onClick={() => this.openDropdown()}>
            <span>
              <i
                className={"dorpdown-arrow " + (dropdownIsShow ? "up" : "down")}
              ></i>
              {this.state.dropdownTitle}
            </span>

            <ul
              className={"months-select " + (dropdownIsShow ? "show" : "hide")}
            >
              {displayMonths.map((m, i) => (
                <li
                  className="month"
                  key={i}
                  onClick={() =>
                    this.handlePickMonth([
                      monthsForDropdown[i].getFullYear(),
                      monthsForDropdown[i].getMonth(),
                      m
                    ])
                  }
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="arrows">
          <i
            className={
              "arrow right " + (this.isFirstMonth() ? " disabeld" : "")
            }
            onClick={() => this.handleMonthArrow(-1)}
          ></i>

          <i
            className={"arrow left " + (this.isLastMonth() ? " disabeld" : "")}
            onClick={() => this.handleMonthArrow(1)}
          ></i>
        </div>

        <div className="calendar">
          <div className="dates">
            {CALENDAR_WEEK_DAYS.map(dayName => (
              <div className="day" key={dayName}>
                {dayName}
              </div>
            ))}

            {this.state.emptyDates.map((d, i) => (
              <div className="date-number empty" key={i}></div>
            ))}

            {this.state.monthDates.map((day, i) => (
              <div
                className={
                  this.isBlockedDay(i)
                    ? "date-number unavailable"
                    : selectedDate &&
                      this.state.year === selectedDate[0] &&
                      this.state.month === selectedDate[1] &&
                      day === selectedDate[2]
                    ? "date-number  available selected"
                    : "date-number available"
                }
                key={i}
                onClick={() => this.handlePickDate(i)}
              >
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
      </div>)}
      </DatepickerContext.Consumer>
    );
    
  }
}

Datepicker.contextType = DatepickerContext;
export default Datepicker;
