var fetch_error = undefined;
var loc = undefined;
// Once the page loads
window.addEventListener('load', function(){
    var defaults = [{'type':'!g','engine': 'https://www.google.com/search?q='},{'type':'!b','engine': 'https://www.bing.com/search?q='},{'type':'!yt','engine': 'https://www.youtube.com/results?search_query='},{'type':'!gh', 'engine': 'https://github.com/search?q='},{'type':'!m', 'engine':'https://developer.mozilla.org/search?q='},{'type':'!a', 'engine':'https://www.amazon.com/s?ie=UTF8&field-keywords='},{'type':'!e', 'engine':'https://www.ebay.com/sch/i.html?_nkw='},{'type':'!s', 'engine':'https://open.spotify.com/search/results/'},{'type':'!sc', 'engine':'https://soundcloud.com/search?q='},{'type':'!t', 'engine':'https://www.tumblr.com/search/'}],
        engine = localStorage.getItem('engine') ? JSON.parse(localStorage.getItem('engine')) : localStorage.setItem('engine', JSON.stringify(defaults));

        console.log(engine);
    const loader = document.getElementById('loader');
    dateclock();
    tabs();
    tab_panels();
    engineFunc();
    loader.style = 'opacity: 0;';
    setTimeout(function(){loader.style.display = 'none';}, 248)
});

// Event listener for the search engine to show up
window.addEventListener('keyup', function(e){
    var input = document.querySelector('.searchengine'),
        textarea = document.querySelector('[name=search]');
        engineScreen = document.querySelector('.engineAdd');
    if(e.shiftKey == true && e.keyCode == 49){
        input.style = 'display: block;';
        textarea.focus();
    }

    if(e.shiftKey == true && e.keyCode == 50){
        engineScreen.style = 'display: block;';
    }

    if(e.keyCode == 27){
        input.style = 'display: none;';
        engineScreen.style = 'display: none;';
    }
});
window.addEventListener('click', (e) =>{
    let input = document.querySelector('.searchengine'),
        search_btn = document.querySelector('#search'),
        engineAdd = document.querySelector('.buttonEngine'),
        btnAdd = document.querySelector('.btn-add'),
        textarea = document.querySelector('[name=search]'),
        btnExit = document.querySelector('.buttonExit'),
        btnDelete = document.querySelectorAll('.btnDelete'),
        engineDone = document.querySelector('.buttonComplete'),
        engineScreen = document.querySelector('.engineAdd');
    let empty = 1;
    for(i = 0; i < btnDelete.length; i++){
        if(btnDelete[i] == e.target || btnDelete[i] == e.path[1]){
            e.target.parentElement.parentElement.remove();
        }
    }

    if(input == e.target){
        input.style = 'display: none;';
    }
    if(search_btn == e.target || search_btn == e.path[1]){ // If the user clicks on the button or the icon
        input.style = 'display: block;';
        textarea.focus();
    }
    if(btnAdd == e.target || btnAdd == e.path[1]){
        engineScreen.style = 'display: block';
    }
    if(engineScreen == e.target || btnExit == e.target || btnExit == e.path[1]){
        engineScreen.style = 'display: none;';
    }
    if(engineAdd == e.target || engineAdd == e.path[1]){
        let amount = (document.querySelector('#engines').childNodes.length - 1) / 2;
        for(i = 1; i < document.querySelector('#engines').childNodes.length; i++){
            for(l = 0; l < document.querySelector('#engines').childNodes[i].childNodes.length; l++){
                if(document.querySelector('#engines').childNodes[i].childNodes[l].value === ''){
                    empty++;
                }
            }
        }
        console.log(empty);
        if(amount <= 14 && empty < 2){
            let icon,btn;
            icon = document.createElement('i');
            btn = document.createElement('a');
            btn.setAttribute('class', 'deleteParent');
            icon.setAttribute('class', 'fas fa-times btnDelete');
            btn.appendChild(icon);
            divelem = document.createElement('div');
            divelem.setAttribute('class', 'engineParentNode');
            textinput1 = document.createElement('input')
            textinput1.setAttribute('type', 'text')
            textinput1.setAttribute('class', 'inputengine')
            textinput2 = document.createElement('input');
            textinput2.setAttribute('type', 'text');
            textinput2.setAttribute('class', 'inputtype');
            divelem.appendChild(textinput2);
            divelem.appendChild(textinput1);
            divelem.appendChild(btn);
            document.getElementById('engines').appendChild(divelem);
        }
    }
    if(engineDone == e.target || engineDone == e.path[1]){
        let sanitize = true,
            tmp = document.querySelector('#engines').childNodes
            arr = [];
        for(i = 1; i < tmp.length; i++){
            for(l = 0; l < tmp[i]; l++){
                if(tmp[i].value === ''){
                    sanitize = false;
                    tmp[i][l].setAttribute('placeholder', 'Please fill out this field')
                    tmp[i][l].focus();
                }else{
                    sanitize = true;
                }
            }
        }
        if(sanitize){
            let count = 0, i = 1, tmpString = `[`;
            let tmpLoopItem
            tmp.forEach((res)=>{
                tmpString += `{"type": "${res.childNodes[0].value}",`
                tmpString += `"engine": "${res.childNodes[1].value}"},`
                i++;
            })
            tmpString = tmpString.replace(/,$/, ']'); // Removes the , at the end of the string if the foreach fails to
            console.log(tmpString);
            localStorage.removeItem('engine');
            localStorage.setItem('engine', tmpString);
            engineScreen.style = 'display: none;';
        }
        let footer = document.querySelector('.engines');
        footer.innerHTML = '';
        document.querySelector('#engines').innerHTML = ''
        engineFunc();
    }
})




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
        color = document.getElementById('color'),
        colorupdate = document.getElementById('colorupdate'),
        currtab,i,currcolor, styleelem, styletext;
        currcolor = localStorage.getItem('color') ? localStorage.getItem('color') : '#f1355a';
        currtab = localStorage.getItem('activetab') ? localStorage.getItem('activetab') : localStorage.setItem('activetab', 0); // If ther isn't any local storage set, this sets it

        // Color Customization
        colorupdate.innerHTML = ':root{--red: ' +currcolor + ' !important;}';
        color.value = currcolor;

        color.addEventListener('', (res)=>{
            console.log(res);
        })

        color.addEventListener('input', function(){
            localStorage.setItem('color', color.value);
            colorupdate.innerHTML = ':root{--red: ' + color.value + ' !important;}';
        }, false)
    
    if(currtab == undefined){ // Fallback since localstorage can still execute while the rest of the code executes
        currtab = 0;
    }
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
    for(i = 0; i < panels.length; i++){
        panels[i].addEventListener('dblclick', function(e){
            color.focus();
            color.click();
        })
    }
}

function tab_panels(){
    // First Panel -----
    weather_location();
    setInterval(function(){
        var weather = document.querySelector('.weather');
            ping = document.querySelector('.ping');
        if(fetch_error != undefined){
            weather.innerHTML = `<span class="red">Error: </span>${fetch_error}`;
            ping.innerHTML = '<span class="red">Error:</span>Failed to connect';
        }else{
            if(loc){
                weather_fetch(loc);
            }else{
                weather_location()
            }
        }
    }, 5000);   
    todo();

}
function tab_ping(latency){
    var ping = document.querySelector('.ping'),
        oldping,newping, i, pingchart, temp, icon;
    latency = Math.round(latency);
    oldping = ping.innerHTML;
    newping = latency;
    if(oldping != newping){
        ping.childNodes[0].style = 'animation: opacity 500ms linear';
        setTimeout(function(){ping.style = '';}, 500);
    }
    ping.innerHTML = `${latency}<span class="red">ms</spanclass>`;
}
function weather_location(){ 
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((pos)=>{
            let request_time = new Date().getMilliseconds();
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=b4695753909b59fcd8fcbe66a2d9ed78`)
            .then((res)=>{
                if(res.status != 200) throw Error(`Unable to connect`);
                res.json().then((resJson)=>{
                    weather_display(resJson, request_time);
                })
            })
        })
    }else{
        fetch('https://geoip.nekudo.com/api')
        .then(function(res){
            if(res.status === 200){
                res.json().then(function(res){
                    loc = res.city;
                    weather_fetch(loc, 0);
                })
            }else{
                throw new error('Something went wrong!');
            }
        })
        .catch((err) =>{
            fetch_error = 'a error occured';
        })
    }
    navigator.geolocation.watchPosition((pos)=>{

    },
    (err)=>{
        if(err.code === err.PERMISSION_DENIED){ // If the user denies GEOLOCATION
            let request_time = new Date().getMilliseconds();
            fetch('https://geoip.nekudo.com/api')
            .then(function(res){
                if(res.status === 200){
                    res.json().then(function(res){
                        loc = res.city;
                        weather_fetch(loc, request_time);
                    })
                }else{
                    throw new error('Something went wrong!');
                }
            })
            .catch((err) =>{
                fetch_error = 'a error occured';
            })
        }
    })
}


weather_display = (result, request) =>{
    let weather, temp, date, request_time, response_time, latency, elem = document.querySelector('.weather');
    date = new Date;
    if(latency != 0) request_time = request;
    response_time = date.getMilliseconds();
    latency = response_time > request_time ? response_time - request_time : request_time - response_time;
    tab_ping(latency)
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
    elem.innerHTML = icon+'<span class="red">'+temp+'</span>\xB0C '+weather.description;
}

function weather_fetch(loc, ping){
    let latency = ping ? ping : new Date().getMilliseconds();
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid=b4695753909b59fcd8fcbe66a2d9ed78')
    .then(function(res){
        if(res.status === 200){
            fetch_error = undefined;
            res.json().then(function(result){
                weather_display(result, latency);
            });
        }else if(res.status === 404){
            elem.innerHTML = 'Unable to <span class="red">connect</span>';
        }else{
            throw new Error('Something went wrong!' + res.status);
        }
    })
    .then(res => {
        console.debug(res);
    }).catch(error => {
          fetch_error = 'Unable to get weather';
    });
}




function todo(){
    const text = document.querySelector('.todo_text');
    var item = localStorage.getItem('todo');
    if(item != ''){
        text.value = item;
    }
    text.addEventListener('keyup', function(e){
        localStorage.removeItem('todo');
        localStorage.setItem('todo', text.value);
    })
}


function engineFunc(){
    var input = document.querySelector('input[name="search"]'),
        footer = document.querySelector('.engines'),
        li,item,node,regex,highlight,i,selected, search_url,divelem,btn,icon
        engines = JSON.parse(localStorage.getItem('engine'));
    engines.forEach(function(engine){
        // Adding all the inputs for the add search engines screen
        divelem = document.createElement('div');
        divelem.setAttribute('class', 'engineParentNode');
        icon = document.createElement('i');
        btn = document.createElement('a');
        btn.setAttribute('class', 'deleteParent');
        icon.setAttribute('class', 'fas fa-times btnDelete');
        btn.appendChild(icon);
        textinput1 = document.createElement('input');
        textinput1.setAttribute('type', 'text');
        textinput1.setAttribute('value', engine.engine);
        textinput1.setAttribute('class', 'inputengine')
        textinput2 = document.createElement('input');
        textinput2.setAttribute('type', 'text');
        textinput2.setAttribute('value', engine.type);
        textinput2.setAttribute('class', 'inputtype');

        divelem.appendChild(textinput2)
        divelem.appendChild(textinput1)
        divelem.appendChild(btn);
        document.getElementById('engines').appendChild(divelem);

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
