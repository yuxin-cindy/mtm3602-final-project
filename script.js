// target elements 
let $image = document.getElementById('image')
let $more =  document.getElementById('more')
let $time =  document.getElementById('time')
let $greeting = document.getElementById('greeting')
let $setting = document.getElementById('setting')
let $choose = document.getElementById('choose')
let $buttonMore = document.getElementById('buttonMore')
let $buttonSave = document.getElementById('buttonSave')
var interval
const DateTime = luxon.DateTime
date = DateTime.fromISO

console.log('='+ DateTime.local().year + '-' + DateTime.local().month + '-' + DateTime.local().day)
// fetch and display the current APOD using the APOD API
fetch('https://api.nasa.gov/planetary/apod?api_key=TP1001u64MGPcbkI7r6a26a35Ji3u7vX59phGJH6&date=' + DateTime.local().year + '-' + DateTime.local().month + '-' + DateTime.local().day)
    .then(response => {
        return response.json()
    })
    .then(data => {    
        console.log(data.url)
        document.body.style.backgroundImage = `url(${data.url})`   
    })
    .catch(error => {
        console.log(error.name,error.message)
    })

// setting greeting 
function greeting(){
    if (DateTime.local().hour < 12){
        $greeting.innerHTML = '<h2>GOOD MORNING</h2>'
    }
    else if (DateTime.local().hour < 18) {
        $greeting.innerHTML = '<h2>GOOD AFTERNOON</h2>'
    }
    else {
        $greeting.innerHTML = '<h2>GOOD EVENING</h2>'
    }
} 
// setting the content in settings menu
$setting.addEventListener('click',function(event){
    event.preventDefault()
    $choose.innerHTML = `
    <h1>SETTINGS</h1>
    <p>24-hour clock</p>
    <input type="radio" id="hours12" name="hours" value="true" >
    <label for="hoursYes">12 hour</label>
    <input type="radio" id="hours24" name="hours" value="false">
    <label for="hoursNo">24 hour</label><br>
    <p>Show seconds</p>
    <input type="radio" id="secondsYes" name="seconds" value="yes">
    <label for="secondsYes">Yes</label>
    <input type="radio" id="secondsNo" name="seconds" value="no">
    <label for="secondsNo">No</label><br>
    <button id="buttonSave" type="submit" >Save</button>
    `  
// When clicking Save, save the customized settings to local storage
    $choose.addEventListener('submit',function(event){
        // event.preventDefault()
        localStorage.setItem('12hourClock',$choose.hours.value)
        localStorage.setItem('showSeconds',$choose.seconds.value)
    })
       
})

// decide wether to show seconds based on setting
let timeFormat = 0
if (localStorage.getItem('showSeconds') == 'yes'){
    timeFormat = {hour: '2-digit', minute: '2-digit', hour12: (localStorage.getItem('12hourClock') == 'true'), second: '2-digit'}
}
else {
    timeFormat = {hour: '2-digit', minute: '2-digit', hour12: (localStorage.getItem('12hourClock') == 'true') }
}

$time.innerHTML = DateTime.local().toLocaleString(timeFormat);


//reset timer
clearInterval(interval)

// Update the greeting and time every 1 second
interval = setInterval(function() {
    greeting()
    $time.innerHTML = DateTime.local().toLocaleString(timeFormat)
},1000)

$more.style.display = "none"
// create event listener on More button 
$buttonMore.addEventListener('click',function(event){
    if ($buttonMore.innerHTML == 'MORE'){
        console.log("is MORE")
        $buttonMore.innerHTML = 'LESS'
        $more.style.display = "block"
      
   } else {
        $buttonMore.innerHTML = 'MORE'
        console.log("is LESS")
        $more.style.display = "none"
   }
  

//  Get the day of the week.
    document.getElementById("week").innerHTML = DateTime.local().weekdayLong;
// show day of the month   
    document.getElementById("monthDay").innerHTML = DateTime.local().day;
// Current month
    document.getElementById("month").innerHTML = DateTime.local().monthLong;

//   returns the year of a date as a four digit number
   document.getElementById("years").innerHTML = new Date().getFullYear();
})




