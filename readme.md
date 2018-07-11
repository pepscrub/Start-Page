# Startup Page
A browser startup page

### Setup
Currently the ping is set to fix a latency difference between the weather api (american server)
and Australian servers. Modify the JS file in view until it looks right. Also for the sake of ip
to location you'll have to change the url in the weatherapi to the main city closest to you.

If you're loading this as a chrome extension
* Goto *chrome://extensions/*
* Load unpacked
* Load the folder where you installed this


```javascript
    // Modify this line here to the closest main city to you after weather?q='YourCity'
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Brisbane&appid=b4695753909b59fcd8fcbe66a2d9ed78')
    .then(function(res){
        if(res.status === 200){
            fetch_error = undefined;
            date = new Date;
            response_time = date.getMilliseconds();
            if(response_time > request_time){
                // Change both of the division values to best mimic latency from your area. This is AEST standard latency
                // Note the weatherapi server is most likely housed in the East Cost in America
                latency = (response_time - request_time) / 4.5;
            }else{
                latency = (request_time - response_time) / 4.5;
            }
```
