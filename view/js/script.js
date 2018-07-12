var fetch_error = undefined;
var loc = undefined;
// Once the page loads
window.addEventListener('load', function(){
    const loader = document.getElementById('loader');
    dateclock();
    tabs();
    tab_panels();
    engines();
    loader.style = 'opacity: 0;';
    setTimeout(function(){loader.style.display = 'none';}, 248)
});

// Event listener for the search engine to show up
window.addEventListener('keyup', function(e){
    var input = document.querySelector('.searchegine');
    if(e.shiftKey == true && e.keyCode == 49){
        input.style = 'display: block;';
    }
    if(e.keyCode == 27){
        input.style = 'display: none;';
    }
});

// The date and clock at the top of the page
function dateclock(){    
    var date = new Date(),
        shrtmon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Short hand dates
        weekdays = ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'], // Short hand days 
        curryear = date.getFullYear(), // Grabbing current year 
        currmon = shrtmon[date.getMonth()], // Sorting through json object via the current month (returns an int)
        currday = weekdays[date.getDay()], // Dito 
        hrs = date.getHours() < 10 ? '0'+date.getHours() : date.getHours(), // If date is less than 10 add a '0' else keep as is 
        mins = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes(), // Dito
        clockelem = document.querySelector('.clock'), // Asigning Elements to modify 
        dateelem = document.querySelector('.date'); 
    dateelem.innerHTML = '<span class="day">'+currday + '</span>, ' + date.getDate() + ' ' + currmon + ' ' + curryear;
    clockelem.innerHTML = '<span class="hours">' + hrs + '</span><span class=":">:</span><span class="min">' + mins + '</span>';
    setTimeout(function(){
        dateclock()
    },1000); // Refresh after 1 second
}

// Timeout for adding the class 
function display(i){
    setTimeout(function(){i.classList.add('hide')}, 250);
}
function tabs(){
    var elem = document.querySelector('.tabs'),
        updatestyle = document.getElementById('tabsupdate'),
        panels = document.querySelectorAll('.panel'),
        currtab = 0,i;
        currtab = localStorage.getItem('activetab');
    if(currtab == 1){
        updatestyle.innerHTML = '.tabs::before{opacity: 1; transform: translateY(0px);}';
        panels[1].classList.add('active');
        panels[1].classList.remove('hide');
    }
    if(currtab == 2){
        updatestyle.innerHTML = '.tabs::before, .tabs::after{opacity: 1; transform: translateY(0px);}';
        panels[2].classList.add('active')
        panels[2].classList.remove('hide');
    }
    if(currtab >= 3 || currtab == 0){
        currtab = 0;
        updatestyle.innerHTML = '';
        panels[0].classList.add('active');
        panels[0].classList.remove('hide');
    }
    elem.addEventListener('click', function(e){ // The clickable icon in the top middle |
        for(i = 0; i < panels.length; i++){ // Removes all the active tabs
            panels[i].classList.remove('active');
            display(panels[i]); //
        }
        currtab++;
        setTimeout(function(){
            if(currtab == 1){
                updatestyle.innerHTML = '.tabs::before{opacity: 1; transform: translateY(0px);}';
                panels[1].classList.add('active');
                panels[1].classList.remove('hide');
            }
            if(currtab == 2){
                updatestyle.innerHTML = '.tabs::before, .tabs::after{opacity: 1; transform: translateY(0px);}';
                panels[2].classList.add('active')
                panels[2].classList.remove('hide');
            }
            if(currtab >= 3){
                currtab = 0;
                updatestyle.innerHTML = '';
                panels[0].classList.add('active');
                panels[0].classList.remove('hide');
            }
            localStorage.setItem('activetab', currtab);
        }, 550);
    })
}

function tab_panels(){
    // First Panel -----
    weather_location();
    setInterval(function(){
        if(fetch_error != undefined){
            var weather = document.querySelector('.weather');
                ping = document.querySelector('.ping');
            weather.innerHTML = '<span class="red">'+fetch_error+'</span>';
            ping.innerHTML = '<span class="red">NaN</span>';
        }
        weather_fetch(loc);
    }, 5000);   
    todo();

}
function tab_ping(latency){
    var ping = document.querySelector('.ping'),
        oldping,newping, i, pingchart, temp, icon;
    latency = Math.round(latency);
    oldping = ping.childNodes[0].innerHTML;
    newping = latency;
    if(oldping != newping){
        ping.childNodes[0].style = 'animation: opacity 500ms linear';
        setTimeout(function(){ping.childNodes[0].style = '';}, 500);
    }
    ping = document.querySelector('.ping');
    ping.childNodes[0].innerHTML = latency;
}
function weather_location(){ 
    fetch('https://geoip.nekudo.com/api')
    .then(function(res){
        if(res.status === 200){
            res.json().then(function(res){
                loc = res.city;
                weather_fetch(loc);
            })
        }else{
            throw new error('Something went wrong!');
        }
    })
}

function weather_fetch(loc){
    var result, weather, temp, date, request_time, response_time, latency, elem = document.querySelector('.weather'),
        offline = window.addEventListener('offline', function(e){return e.returnValue});
        date = new Date;
        request_time = date.getMilliseconds();
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid=b4695753909b59fcd8fcbe66a2d9ed78')
    .then(function(res){
        if(res.status === 200){
            fetch_error = undefined;
            date = new Date;
            response_time = date.getMilliseconds();
            if(loc === 'Brisbane'){
                if(response_time > request_time){
                    latency = (response_time - request_time) / 4.5;
                }else{
                    latency = (request_time - response_time) / 4.5;
                }
            }else{
                latency = response_time - request_time;
            }
            tab_ping(latency)
            res.json().then(function(result){
                switch(temp=Math.round(result.main.temp-273.15), (weather=result.weather[0]).icon) {
                    case"01n": icon='<i class="fas fa-moon"></i>';
                    break;
                    case"01d": icon='<i class="fas fa-sun"></i>';
                    break;
                    case"02n": case"02d": icon='<i class="fas fa-cloud"></i>';
                    break;
                    case"03n": case"03d": icon='<i class="fas fa-cloud"></i>';
                    break;
                    case"04n": case"04d": icon='<i class="fas fa-cloud"></i>';
                    break;
                    case"09n": case"09d": icon='<i class="fas fa-tint"></i>';
                    break;
                    case"10n": case"10d": icon='<i class="fas fa-tint"></i>';
                    break;
                    case"11n": case"11d": icon='<i class="fas fa-bolt"></i>';
                    break;
                    case"13n": case"13d": icon='<i class="far fa-snowflake"></i>';
                    break;
                    case"50n": case"50d": icon='<i class="fas fa-eye-slash"></i>'
                }
                elem.innerHTML = icon+'<span class="red">'+temp+'</span>\xB0C '+weather.description
            });
        }else{
            throw new Error('Something went wrong!');
        }
    })
    .then(res => {
        console.debug(res);
    }).catch(error => {
          fetch_error = error;
    });
}




function todo(){
    const text = document.querySelector('.todo_text');
    var item = localStorage.getItem('todo');
    if(item != ''){
        text.value = item;
    }
    text.addEventListener('keyup', function(e){
        localStorage.clear();
        localStorage.setItem('todo', text.value);
    })
}


function engines(){
    var engines = [
            {'type':'!g','engine': 'https://www.google.com/search?q='},
            {'type':'!b','engine': 'https://www.bing.com/search?q='},
            {'type':'!yt','engine': 'https://www.youtube.com/results?search_query='},
            {'type':'!gh', 'engine': 'https://github.com/search?q='},
            {'type':'!m', 'engine':'https://developer.mozilla.org/search?q='},
            {'type':'!a', 'engine':'https://www.amazon.com/s?ie=UTF8&field-keywords='},
            {'type':'!e', 'engine':'https://www.ebay.com/sch/i.html?_nkw='},
            {'type':'!s', 'engine':'https://open.spotify.com/search/results/'},
            {'type':'!sc', 'engine':'https://soundcloud.com/search?q='},
            {'type':'!t', 'engine':'https://www.tumblr.com/search/'}
        ],
        input = document.querySelector('input[name="search"]'),
        footer = document.querySelector('.engines'),
        li,item,node,regex,highlight,i,selected, search_url;
    
    engines.forEach(function(engine){
        li = document.createElement('li');
        item = document.createTextNode(engine.type);
        li.appendChild(item);
        li.setAttribute('id', engine.type+' ');
        footer.appendChild(li);
    });
    input.addEventListener('keyup', function(e){
        footer = document.querySelector('.engines')
        engines.forEach(function(engine){
            regex = new RegExp('^\\'+engine.type+' ');
            if(regex.test(input.value)){
                if(document.getElementById(input.value) != null){
                    for(i = 0; i < footer.childNodes.length; i++){
                        footer.childNodes[i].classList.remove('red');
                        input.classList.remove('red')
                    }
                    selected = engine.engine;
                    document.getElementById(input.value).classList.add('red');
                    input.classList.add('red');
                }
                if(selected != '' && selected != undefined){
                    search_url = selected + input.value.replace(regex, '');
                }
            }
        })
        if(e.code == 'Enter' && e.key == 'Enter' && e.keyCode == '13' && selected != undefined){
            location.href = search_url;
        }
    })
}