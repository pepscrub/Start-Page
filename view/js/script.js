var fetch_error = undefined;
var loc = undefined;
// Once the page loads
window.addEventListener('load', function(){
    const   defaults = [{'type':'!g','engine': 'https://www.google.com/search?q='},{'type':'!b','engine': 'https://www.bing.com/search?q='},{'type':'!yt','engine': 'https://www.youtube.com/results?search_query='},{'type':'!gh', 'engine': 'https://github.com/search?q='},{'type':'!m', 'engine':'https://developer.mozilla.org/search?q='},{'type':'!a', 'engine':'https://www.amazon.com/s?ie=UTF8&field-keywords='},{'type':'!e', 'engine':'https://www.ebay.com/sch/i.html?_nkw='},{'type':'!s', 'engine':'https://open.spotify.com/search/results/'},{'type':'!sc', 'engine':'https://soundcloud.com/search?q='},{'type':'!t', 'engine':'https://www.tumblr.com/search/'}],
            defaultBoards = [{"board": "/wsg/","url": "https://boards.4chan.org/wsg/"},{"board": "/wg/","url": "https://boards.4chan.org/wg/"},{"board": "/w/","url": "https://boards.4chan.org/w/"},{"board": "/v/","url": "https://boards.4chan.org/v/"},{"board": "/g/","url": "https://boards.4chan.org/g/"},{"board": "/kawaii/","url": "https://sushigirl.us/kawaii/"},{"board": "/music/","url": "https://lainchan.org/music/res/898.html"},{"board": "/λ/","url": "https://www.lainchan.org/lambda/"}],
            engine = localStorage.getItem('engine') ? JSON.parse(localStorage.getItem('engine')) : localStorage.setItem('engine', JSON.stringify(defaults)),
            boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : localStorage.setItem('boards', JSON.stringify(defaultBoards)),
            weatherID = localStorage.getItem('appIDS') ? JSON.parse(localStorage.getItem('appIDS')) : localStorage.setItem('appIDS', JSON.stringify({"ID":"b4695753909b59fcd8fcbe66a2d9ed78"})),
            loader = document.getElementById('loader');
    dateclock();
    tabs();
    tab_panels();
    engineFunc();
    eventListners();
    boardsFunc();
    devMessage();
    loader.style = 'opacity: 0;';
    setTimeout(function(){loader.style.display = 'none';}, 248);
    if(navigator){
        if(!navigator.userAgent.indexOf("Chrome")){
            document.querySelector('.weather').innerHTML = 'Please run this app in Chrome';
        }
    }
});

// Recoded how anchor tags work inorder for popup html to function normally

window.addEventListener('load',()=>{
    const json = document.querySelectorAll('a');
    json.forEach((elem)=>{
        elem.addEventListener('click', (e)=>{
            e.preventDefault();
            e.path.forEach((item)=>{
                if(elem === item){
                    if(item.href != undefined && item.href != '' && item.hasAttribute('href')){
                        window.close();
                        window.open(item.href);
                    }
                }
            })
        })
    })
})


devMessage = () =>{
    console.log('%cDear Developers!'+'%c\nIf you want to set your own ID for the weatherAPI type into the console'+'%c\nappId(youreidhere)',"font-family: 'Roboto' sans serif; color: red; font-weight: 900; font-size: 1.5em;","font-family: 'Roboto' sans serif;color:black","font-family: 'Roboto' sans serif; color: #ff674c;")
}

appId = (id) =>{
    localStorage.setItem('appIDS', JSON.stringify({"ID":id}))
}
// Sets the boards on page load and when modifying the board via the context menu
// This reads the html of the page which is been modified by the event listners from the inputs
// The reason for doing this is to apply Web App standards and dynamically changing the site while
// storing the information required in the background (localstorage)
boardsFunc = () =>{
    let listItems = document.querySelectorAll('.listItem'),
        i = 0,
        boards = JSON.parse(localStorage.getItem('boards'));

    listItems.forEach((list)=>{
        if(boards[i] != undefined){
            list.innerHTML = boards[i].board;
            list.href = boards[i].url;
        }
        i++;
    })

}

eventListners = () =>{

    // Declartion of event listener elements 

    let input = document.querySelector('.searchengine'), // The area around the search engine box, e.g the background area 
        search_btn = document.querySelector('#search'), // The search button
        engineAdd = document.querySelector('.buttonEngine'), // The button + button at the top of the engine page
        btnAdd = document.querySelector('.btn-add'), // The button + button in the search text field
        textarea = document.querySelector('[name=search]'), // The text input for the search page 
        btnExit = document.querySelector('.buttonExit'), // Exit button for the engine page 
        btnDelete = document.querySelectorAll('.btnDelete'), // Delete button for the engine type 
        engineDone = document.querySelector('.buttonComplete'), // The check button to complete the form
        engineScreen = document.querySelector('.engineAdd'); // The engine screen area


    // Shortcuts
    document.addEventListener('keyup', function(e){
        let input = document.querySelector('.searchengine'),
            textarea = document.querySelector('[name=search]');
            engineScreen = document.querySelector('.engineAdd');
        if(e.shiftKey == true && e.keyCode == 49){ // = SHIFT+1
            input.style = 'display: block;';
            textarea.focus();
        }
    
        if(e.shiftKey == true && e.keyCode == 50){ // = SHIFT+2
            engineScreen.style = 'display: block;';
        }

    
        if(e.keyCode == 27){ // Escape for search and engine add screens
            if(input.style.cssText == 'display: block;'){
                input.style = 'opacity: 0;';
                setTimeout(()=>{
                    if(input.style.cssText != 'display: block;'){
                        input.style = 'display: none;';
                    }
                }, 125)
            }
            if(engineScreen.style.cssText == 'display: block;'){ // Closes the engine list screen
                engineScreen.style = 'opacity: 0;';
                setTimeout(()=>{
                    if(engineScreen.style.cssText != 'display: block;'){
                        engineScreen.style = 'display: none;';
                    }
                }, 125)
            }
        }
    });


    // Context menu (The right click menu)
    document.addEventListener('contextmenu', (e)=>{
        e.preventDefault(); // Prevents the normal screen opening up
        let menu = document.getElementById('menu'),
            listitems = document.querySelectorAll('.list');
            board = document.getElementById('itemText'),
            boardurl = document.getElementById('itemURL');
        // if(e.path[0].href == undefined) objelem = e.path[1] 
        objelem = e.path[0].href != undefined ? e.path[0] : e.path[1];
        if(/^\//test(objelem.innerHTML)){// just tests to see if the right clicked elem starts with a forward slash
            let boards = (arg) =>{
                console.log(e)
                console.log(arg)
                if(arg !== 'text'){
                    board.value = objelem.innerHTML;
                    boardurl.value = objelem.href;
                }
                menu.style = `display: block; left: ${X}px; top: ${e.screenY-150}px;`;
                let tmpString = '[',instance = 0;
                for(i = 1; i < listitems.length; i++){
                    document.querySelectorAll('.list')[i].childNodes.forEach((res)=>{
                        res.childNodes.forEach((res)=>{
                            if(res.href != undefined || res.innerHTML != undefined){
                                let board = res.innerHTML.replace(/\"/, ''),
                                    url = res.href.replace(/\"/, '');
                                board = board.replace(/\\/, '');
                                if(board === '' || board === ' ') board = `/empty${Math.floor(Math.random(100) * 10)}/`;
                                url = url.replace(/\\/, ''); // Some real basic sanitization
                                tmpString += `{"board": "${board}","url": "${url}"},`
                            }
                        })
                    })
                }
                let jsonString = tmpString.replace(/,$/, '') + ']';
                localStorage.setItem('boards', jsonString);            
            }
            let ultrawide = window.outerWidth > 1920 ? true : false, X;
                X = e.screenX < 0 && ultrawide ? 2560 + e.screenX : e.screenX; // Fallback for ultra wide monitors
            if(ultrawide){
                    if(Math.abs(e.screenX) < 2560 - (window.innerWidth / 2)) X = X - 500; // If the screenX is more than 2560 - the current window size divided 2
                    // Need to calc ultra wides like this due to it goes from -2560 to 0 instead of positives
                    // Not entirely sure if this is a side effect of the main monitor not been the 21:9 though
            }else{
                if(window.innerWidth / 2 <= e.screenX){
                    X = X - 500;
                }
            }
            boards('normal');
            // Inputing handlers
            let items = document.querySelectorAll('.listItem');
            board.addEventListener('keyup', (res)=>{
                let instance = 0;
                items.forEach((item)=>{
                    if(board.value == item.innerHTML){
                        instance++;
                    }
                })
                if(instance === 1){
                    return;
                }else{
                    objelem.innerHTML = board.value;
                    boards('text');
                }
            })
            boardurl.addEventListener('keyup',(res)=>{
                let instance = 0;
                items.forEach((item)=>{
                    if(board.href == item.innerHTML){
                        instance++;
                    }
                })
                if(instance === 1){
                    return;
                }else{
                    objelem.href = boardurl.value;
                    boards('text');
                }
            })
        } 

    })
    // All the click events
    let panels = document.querySelectorAll('.panel');
    panels.forEach((panel)=>{
        panel.addEventListener('dblclick', (e)=>{
            let color = document.querySelector('#color')
            color.focus();
            color.click();
        })
    }, false)
    let empty = 1;
    window.addEventListener('click', (e)=>{
        let menu = document.getElementById('menu');
        for(i = 0; i < btnDelete.length; i++){
            if(btnDelete[i] == objelem || btnDelete[i] == e.path[1]){
                objelem.parentElement.parentElement.remove();
            }
        }
        if(objelem != menu && e.path[3] != menu && e.path[2] != menu){
            menu.style = 'display: none;'
        }
    }, false)
    input.addEventListener('click', (e)=>{ // Click out of the search panel 
        input.style = 'opacity: 0;';
        setTimeout(()=>{
            if(input.style.cssText != 'display: block;'){
                input.style = 'display: none;';
            }
        }, 125)
        return;
    }, false)
    btnAdd.addEventListener('click', (e)=>{
        engineScreen.style = 'display: block';
        return;
    }, false)
    btnExit.addEventListener && engineScreen.addEventListener('click', (e)=>{
        if(e.path[0] == btnExit || e.path[0] == engineScreen){ // Fallback to child nodes of the elems where activating this event listner
            engineScreen.style = 'opacity: 0;';
            setTimeout(()=>{
                if(engineScreen.style.cssText != 'display: block;'){
                    engineScreen.style = 'display: none;';
                }
            }, 125)
        }
        return;
    }, false)
    engineScreen || btnExit.addEventListener('click', (e)=>{
        engineScreen.style = 'display: block';
        return;
    }, false)
    search_btn.addEventListener('click', (e)=>{
        input.style = 'display: block;';
        textarea.focus();
    }, false)

    engineAdd.addEventListener('click', (e)=>{
        let elem = document.querySelector('#engines')
        let amount = (elem.childNodes.length - 1) / 2; // Calculate the amount of engines on screen (division by 2 is done due to the prefix also been a field within the child elems)
        for(i = 1; i < elem.childNodes.length; i++){ // Loop for the child node of the <element id="engines"></element>
            for(l = 0; l < elem.childNodes[i].childNodes.length; l++){ // Down the tree of the engine and grabing the input fields
                if(elem.childNodes[i].childNodes[l].value === ''){ // If empty, increase the value of the empty var
                    empty++;
                }
            }
        }
        if(amount <= 14 && empty < 2){ // Hard cap on 15 due to the screen overflowing (also who really needs 15 searches?)
            let icon,btn;
            icon = document.createElement('i'); // Creates italic element for the icon can be replaced with span but doesn't really need to be
            btn = document.createElement('a'); // Creates anchor tag
            btn.setAttribute('class', 'deleteParent'); // Adds class for other JS to target
            icon.setAttribute('class', 'fas fa-times btnDelete'); // fas fa-times is FA icons, btnDelete is targeted by an event listner
            btn.appendChild(icon); // Place icon elem inside btn
            divelem = document.createElement('div'); // Creating a parent div for the inputs to fit inside
            divelem.setAttribute('class', 'engineParentNode'); // Targeted by the JSON complier script/func
            textinput1 = document.createElement('input') // input for the url
            textinput1.setAttribute('type', 'text')
            textinput1.setAttribute('class', 'inputengine')
            textinput2 = document.createElement('input');
            textinput2.setAttribute('type', 'text');
            textinput2.setAttribute('class', 'inputtype');
            divelem.appendChild(textinput2); // Prefix
            divelem.appendChild(textinput1); // Input for url
            divelem.appendChild(btn); // Button to delete 
            document.getElementById('engines').appendChild(divelem);
        }
    }, false)
    engineDone.addEventListener('click',(e)=>{
        let sanitize = true, // Santization, literally only used to check an empty field thus far 
            tmp = document.querySelector('#engines').childNodes 
            arr = []; // Array 
        for(i = 1; i < tmp.length; i++){
            for(l = 0; l < tmp[i]; l++){
                if(tmp[i].value === ''){
                    sanitize = false;
                    tmp[i][l].setAttribute('placeholder', 'Please fill out this field')
                    tmp[i][l].focus(); // I mean, this is pretty obvious 
                }else{
                    sanitize = true;
                }
            }
        }
        
        if(sanitize){
            let tmpString = `[`;
            tmp.forEach((res)=>{
                tmpString += `{"type": "${res.childNodes[0].value}",`
                tmpString += `"engine": "${res.childNodes[1].value}"},`
                i++;
            })
            tmpString = tmpString.replace(/,$/, ']'); // Removes the , at the end of the string if the foreach fails to
            localStorage.removeItem('engine');
            localStorage.setItem('engine', tmpString);
            engineScreen.style = 'display: none;';
        }
        let footer = document.querySelector('.engines');
        footer.innerHTML = '';
        document.querySelector('#engines').innerHTML = ''
        engineFunc();
    }, false)
}

// The date and clock at the top of the page
dateclock = () =>{    
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
    dateelem.innerHTML = `<span class="day">${currday}</span> ${date.getDate()} ${currmon} ${curryear}`; // Rewrites the current date
    clockelem.innerHTML = `<span class="hours">${hrs}</span><span class=":">:</span><span class="min">${mins}</span>`; // Rewrires the clock Element
    setTimeout(function(){
        dateclock() // Callback to call the parent function every 1 second
    },1e3); // Defined in milliseconds 
}

// Timeout for adding the class 
display = (i) =>{
    setTimeout(function(){i.classList.add('hide')}, 250);
}
tabs = () =>{
    var elem = document.querySelector('.tabs'),
        updatestyle = document.getElementById('tabsupdate'),
        panels = document.querySelectorAll('.panel'),
        color = document.getElementById('color'),
        colorupdate = document.getElementById('colorupdate'),
        currtab,i,currcolor, tabCalc,
        currcolor = localStorage.getItem('color') ? localStorage.getItem('color') : '#f1355a',
        currtab = localStorage.getItem('activetab') ? localStorage.getItem('activetab') : localStorage.setItem('activetab', 0); // If ther isn't any local storage set, this sets it

    // Color Customization
    colorupdate.innerHTML = `:root{--red: ${currcolor} !important;}`;
    color.value = currcolor;

    color.addEventListener('input', function(){
        localStorage.setItem('color', color.value);
        colorupdate.innerHTML = ':root{--red: ' + color.value + ' !important;}';
    }, false)
    
    tabCalc = () =>{
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
    }
    tabCalc();
    let panelEvent = (arg) => {for(i = 0; i < panels.length; i++){panels[i].classList.remove('active');display(panels[i]);}if(arg==='pos'){currtab++}else{currtab--;;if(currtab === 0){currtab = 3;}if(currtab <= 0){currtab = 2;}};setTimeout(()=>{if(currtab == 1){updatestyle.innerHTML = '.tabs::before{opacity: 1; transform: translateY(0px);}';panels[1].classList.add('active');panels[1].classList.remove('hide');}if(currtab == 2){updatestyle.innerHTML = '.tabs::before, .tabs::after{opacity: 1; transform: translateY(0px);}';panels[2].classList.add('active');panels[2].classList.remove('hide');}if(currtab >= 3){currtab = 0;updatestyle.innerHTML = '';panels[0].classList.add('active');panels[0].classList.remove('hide');};localStorage.setItem('activetab', currtab);}, 550);}
    // Clickable tabs up the top of the page
    window.addEventListener('storage', (value)=>{
        let text = document.querySelector('.todo_text'),
            item = localStorage.getItem('todo')
        if(text !== document.activeElement){
            if(value.key === 'todo'){
                text.value = value.newValue;
            }
        }
        if('activetab' === value.key ){
            panelEvent('pos');
        }
    })

    elem.addEventListener('click', function(e){ // The clickable icon in the top middle |
        panelEvent('pos');
    })

    
    document.addEventListener('keyup',(e)=>{
        let todo = document.querySelector('.todo_text'),
            input1 = document.querySelector('#itemText'),
            input2 = document.querySelector('#itemURL');

        if(e.path[0] === todo || e.path[0] == input1 || e.path[0] == input2) return;
        if(e.keyCode === 39){
            panelEvent('pos')
        }
        if(e.keyCode === 37){
            panelEvent('neg')
        }
    }, false)
    let wheelTimeout = false;
    document.addEventListener('mousewheel', (e)=>{
        if(wheelTimeout) return;
        if(e.wheelDelta > 0){
            panelEvent('neg')
        }else{
            panelEvent('pos')
        }
        wheelTimeout = true
        setTimeout(()=>{wheelTimeout = false},1000); // Delay of 250ms
    }, false)
}

tab_panels = () =>{
    // First Panel -----
    weather_location();
    setInterval(function(){
        var weather = document.querySelector('.weather');
            ping = document.querySelector('.ping');
        if(fetch_error != undefined){
            weather.innerHTML = `<span class="red">Error</span>`;
            ping.innerHTML = '';
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
tab_ping = (latency) =>{
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
weather_location = () =>{ 
    let appid = JSON.parse(localStorage.getItem('appIDS'));
    if("geolocation" in navigator){
        if(localStorage.getItem('location') != null){
            let pos = JSON.parse(localStorage.getItem('location'));
            let request_time = new Date().getMilliseconds();
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${appid.ID}`)
            .then((res)=>{
                if(res.status != 200) throw Error(`Unable to connect`);
                res.json().then((resJson)=>{
                    weather_display(resJson, request_time);
                })
            })
        }else if(localStorage.getItem('location') === null){
            navigator.geolocation.getCurrentPosition((pos)=>{
                let request_time = new Date().getMilliseconds();
                let locationVals = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
                localStorage.setItem('location', JSON.stringify(locationVals));
                return;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${appid.ID}`)
                .then((res)=>{
                    if(res.status != 200) throw Error(`Unable to connect`);
                    res.json().then((resJson)=>{
                        weather_display(resJson, request_time);
                    })
                })
            })
        }
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
    }
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

weather_fetch = (loc, ping) =>{
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
    .catch(error => {
          fetch_error = 'Unable to get weather';
    });
}

todo = () =>{
    const text = document.querySelector('.todo_text');
    var item = localStorage.getItem('todo');
    if(item != ''){
        text.value = item;
    }
    text.addEventListener('keyup', function(e){
        if(text.value != item){
            localStorage.setItem('todo', text.value);
        }
    })
}

engineFunc = () =>{
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
            window.open(search_url);
            window.close();
        }
    })
}