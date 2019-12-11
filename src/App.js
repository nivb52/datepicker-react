import React, { Component } from "react";
import "./App.css";

import Datepicker from "./datepicker/Datepicker";
import DatepickerContext from "./datepicker/datepickerContext.js";

class App extends Component {
  setSelectedDate = selectedDate => {
    this.setState({ selectedDate });
  };

  state = {
    selectedDate: [],
    setSelectedDate: this.setSelectedDate
  };

  render() {
    const Lang = navigator.language || "he-IL";
    const guide1_En = "Departure and return dates are possible";
    const guide2_En = "Possibility of charter flights on these dates";
    const headline_En =   "Exit Date"

    const guide1_He = "תאריכי יציאה וחזרה אפשריים";
    const guide2_He = `אפשרות טיסת צ'רטר בתאריכים אלו`;
    const headline_He =   "תאריך יציאה"

    const guide1 = Lang === "he-IL" ? guide1_He : guide1_En;
    const guide2 = Lang === "he-IL" ? guide2_He : guide2_En;
    const headline = Lang === "he-IL" ? headline_He : headline_En;
    //How much ahead you can see/book dates
    const maxMonths = 12;

    //DEMO: BLOCK DATES AT DECEMBER AND CREATE THE WORD 'NIV'
    const blockedDats = [
      { dd: 2, mm: 11, yy: 2019 },
      { dd: 4, mm: 11, yy: 2019 },
      { dd: 9, mm: 11, yy: 2019 },
      { dd: 11, mm: 11, yy: 2019 },
      { dd: 16, mm: 11, yy: 2019 },
      { dd: 17, mm: 11, yy: 2019 },
      { dd: 23, mm: 11, yy: 2019 },
      { dd: 24, mm: 11, yy: 2019 },
      { dd: 18, mm: 11, yy: 2019 },
      { dd: 13, mm: 11, yy: 2019 },
      { dd: 14, mm: 11, yy: 2019 },
      { dd: 20, mm: 11, yy: 2019 },
      { dd: 21, mm: 11, yy: 2019 }
    ];
    return (
      <div className="App">
        <DatepickerContext.Provider
          value={{
            monthDisplayStyle: "long",
            blockedDats,
            maxMonths,
            selectedDate: this.state.selectedDate,
            setSelectedDate: this.state.setSelectedDate,
            headline,
            guideAvailable: guide1,
            guide2
          }}
        >
          <Datepicker />
        </DatepickerContext.Provider>
      </div>
    );
  }
}

export default App;
