window.addEventListener('load', function(){
    dateclock();
    tabs();
    tab_panels();
    engines();
});
window.addEventListener('keyup', function(e){
    var input = document.querySelector('.searchegine');
    if(e.shiftKey == true && e.keyCode == 49){
        input.style = 'display: block;';
    }
    if(e.keyCode == 27){
        console.log('fired');
        input.style = 'display: none;';
    }
});
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
function display(i){
    setTimeout(function(){i.classList.add('hide')}, 250);
}
function tabs(){
    var elem = document.querySelector('.tabs'),
        updatestyle = document.getElementById('tabsupdate'),
        panels = document.querySelectorAll('.panel'),
        currtab = 0,i;
    elem.addEventListener('click', function(e){
        for(i = 0; i < panels.length; i++){
            panels[i].classList.remove('panel_animation_fwrd');
            display(panels[i]);
        }
        currtab++;
        setTimeout(function(){
            if(currtab == 1){
                updatestyle.innerHTML = '.tabs::before{opacity: 1; transform: translateY(0px);}';
                panels[1].classList.add('panel_animation_fwrd');
                panels[1].classList.remove('hide');
            }
            if(currtab == 2){
                updatestyle.innerHTML = '.tabs::before, .tabs::after{opacity: 1; transform: translateY(0px);}';
                panels[2].classList.add('panel_animation_fwrd')
                panels[2].classList.remove('hide');
            }
            if(currtab >= 3){
                currtab = 0;
                updatestyle.innerHTML = '';
                panels[0].classList.add('panel_animation_fwrd');
                panels[0].classList.remove('hide');
            }
            console.log(currtab);
        }, 550);
    })
}

function tab_panels(){
    // First Panel -----
    if(navigator.onLine){
        weather_api();
        setInterval(function(){
            if(weather_api == 'ERROR'){
                clearInterval();
            }
        }, 5000);   
    }
    // Second Panel -----
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
function weather_api(){
    var result, weather, temp, date, request_time, response_time, latency, elem = document.querySelector('.weather');
    date = new Date;
    request_time = date.getMilliseconds();
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Brisbane&appid=b4695753909b59fcd8fcbe66a2d9ed78')
    .then(function(res){
        if(res.status === 200){
            date = new Date;
            response_time = date.getMilliseconds();
            if(response_time > request_time){
                latency = (response_time - request_time) / 4.5;
            }else{
                latency = (request_time - response_time) / 4.5;
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
            return 'ERROR';
        }
    })
    .then(res => {
        console.debug(res);
      }).catch(error => {
        console.error(error);
      });
}


function todo(){

}


function engines(){
    var engines = [
            {'type':'!g','engine': 'https://www.google.com/search?q='},
            {'type':'!b','engine': 'https://www.bing.com/search?q='},
            {'type':'!yt','engine': 'https://www.youtube.com/results?search_query='}
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
                    }
                    selected = engine.engine;
                    document.getElementById(input.value).classList.add('red');
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