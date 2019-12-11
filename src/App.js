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

    //DEMO: BLOCK DATES AT NEXT MONTH
    const d = new Date()
    const mm = d.getMonth() === 11 ? 0 : d.getMonth() + 1
    const blockedDats = [
      { dd: 2, mm, yy : 2020 },
      { dd: 4, mm, yy : 2020  },
      { dd: 6, mm, yy : 2020  },
      { dd: 8, mm, yy : 2020  },
      { dd: 10, mm, yy : 2020  },
      { dd: 22, mm, yy : 2020  },
      { dd: 24, mm, yy : 2020  },
      { dd: 26, mm, yy : 2020  },
      { dd: 28, mm, yy : 2020  },
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
