import React, { useState } from 'react';
import './App.css';

import Datepicker from './datepicker/Datepicker';
import DatepickerContext from './datepicker/datepickerContext.js';
import {
  guide1_En,
  guide2_En,
  headline_En,
  guide1_He,
  guide2_He,
  headline_He,
  blockedDats,
} from './date_picker_demo';

function App() {
  const [selectedDate, setSelectedDate] = useState([]);
  const Lang = navigator.language || 'he-IL';
  const guide1 = Lang === 'he-IL' ? guide1_He : guide1_En;
  const guide2 = Lang === 'he-IL' ? guide2_He : guide2_En;
  const headline = Lang === 'he-IL' ? headline_He : headline_En;

  const maxMonths = 12; // @description: How much ahead you can see/book dates

  return (
    <div className="App">
      <DatepickerContext.Provider
        value={{
          selectedDate,
          setSelectedDate,
          monthDisplayStyle: 'long',
          blockedDats,
          maxMonths,
          headline,
          guideAvailable: guide1,
          guide2,
        }}>
        <div>
          <Datepicker />
        </div>
      </DatepickerContext.Provider>
    </div>
  );
}

export default App;
