import React from "react";
const datepickerContext = React.createContext({
    selectedDate: [],
    setSelectedDate: () => {}
});
export default datepickerContext;
