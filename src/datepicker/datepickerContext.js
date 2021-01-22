import React from 'react';
const datepickerContext = React.createContext({
  selectedDate: [],
  setSelectedDate: () => {},
  maxMonths: 12, // @description: How much ahead you can see/book dates
});
export default datepickerContext;
