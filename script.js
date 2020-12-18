// add prototype
let $image = document.getElementById('image')
let $more =  document.getElementById('more')
let $time =  document.getElementById('time')
let $greeting = document.getElementById('greeting')
let $setting = document.getElementById('setting')
let $choose = document.getElementById('choose')
let $buttonMore = document.getElementById('buttonMore')
let $buttonSave = document.getElementById('buttonSave')
let $container = document.getElementById('container')
var interval
const DateTime = luxon.DateTime
date = DateTime.fromISO

console.log('='+ DateTime.local().year + '-' + DateTime.local().month + '-' + DateTime.local().day)

fetch('https://api.nasa.gov/planetary/apod?api_key=TP1001u64MGPcbkI7r6a26a35Ji3u7vX59phGJH6&date=2020-12-12')
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
    $choose.addEventListener('submit',function(event){
        // event.preventDefault()
        localStorage.setItem('12hourClock',$choose.hours.value)
        localStorage.setItem('showSeconds',$choose.seconds.value)
    })
       
})
// localStorage.setItem('12hourClock','true')
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

// Update the count down every 1 second
interval = setInterval(function() {
    greeting()
    $time.innerHTML = DateTime.local().toLocaleString(timeFormat)
},1000)


$buttonMore.addEventListener('click',function(event){
    if ($buttonMore.innerHTML == 'MORE'){
        console.log("is MORE")
        $buttonMore.innerHTML = 'LESS'
        $more.innerHTML =  `
        <div class="moreButton">
        <div>
            <h3>Day of the week</h3>
            <div id="week"></div>
        </div>
        <div>
            <h3>Day of the month</h3>
            <div id="monthDay"></div>
        </div>
        <div>
            <h3>Current Month</h3>
            <div id="month"></div>
        </div>
        <div>
            <h3>Current Year</h3>
            <div id="years"></div>
        </div>
        <div>
        `
   } else {
        $more.innerHTML = ''
        $buttonMore.innerHTML = 'MORE'
        console.log("is LESS")
   }

//  Return the name of the weekday
    var d = new Date();
    var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    var d = new Date();
    document.getElementById("week").innerHTML = n ;
// show day of the month   
    document.getElementById("monthDay").innerHTML = DateTime.local().day;
// Current month
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById("month").innerHTML = months[d.getMonth()];

//   returns the year of a date as a four digit number
   document.getElementById("years").innerHTML = d.getFullYear();
})




