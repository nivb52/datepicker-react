## Datepicker

### Custom designed calendar component according .
* Pictures are at the design folder
<div style="display: inline;">
<img width="32%" src="./design/datepicker.png" />
<img width="32%" src="./design/hover-selected.png" />
<img width="32%" src="./design/dropdown.png" />
</div>

### LIGHTWEIGHT
* no usage of CSS frameworks 
* No moment.js needed
* No use of any 3rd party data model
* when clicked, the selected date printed in console as Date() object of JS.
* The calendar allow date selection between today till maxMonths


### More features are:
* Calendar easily cloned by providing another data model (by React Context)
* Animation effects to: hovers and menu openings 
* Only selectable dates can be clicked 
* Current month passed days are not selectable
* Fonts are included in fonts folder

### Data to supply: 
* const blockedDats = [
      { dd: 2, mm: 11, yy: 2019 }
      ]
* How much ahead you can see/book dates : maxMonths = 12;
* First line, and 2nd line guide for the datepicker: 
  in english : guide1_En1  / guide1_En2
  in other lang :guide1_LangPrefix  // there is an example for 1 more lang

<pre>
< DatepickerContext.Provider
          value={{
            // data
            blockedDats,
            maxMonths,

            // using container state
            selectedDate: this.state.selectedDate,
            setSelectedDate: this.state.setSelectedDate,
            
            // texts and display:
            monthDisplayStyle: "long",
            headline: "exit date",
            guideAvailable: guide1,
            guide2
          }}
        >
</pre>


### Fonts
* fonts are included in fonts folder
* Calendar title - Almoni 19px bold
* Dropdown - Almoni 15px
* Day names - Almoni 14px
* Day numbers - Open Sans 12px


### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
