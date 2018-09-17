function request(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(this.responseText)
                }
                else {
                    reject(this.statusText);
                }
            }
        }
        xhr.send();
    });
}

function initMap(coord) {
    // The location of location
    var location = coord;
    // The map, centered at location
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: location});
    // The marker, positioned at location
    var marker = new google.maps.Marker({position: location, map: map});
}

(function appendGoogleMapsScript() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + KEY + "&callback=initMap"
    document.body.appendChild(script);
})();

function displayUser(data) {
    const parsedData = JSON.parse(data);
    const img = document.getElementById('user-img');
    img.src = 'https://avatars.dicebear.com/v2/' + parsedData.gender + '/' + parsedData.name + ' ' + parsedData.surname + '.svg';
    img.onload = function() {
        document.getElementById('user-name').textContent = 'Name: ' + parsedData.name + ' ' + parsedData.surname;
        document.getElementById('user-gender').textContent = 'Gender: ' + parsedData.gender;
        document.getElementById('user-country').textContent = 'Country: ' + parsedData.region;
    }
    return data;
}

function getGeoCoordinates(data) {
    const parsedData = JSON.parse(data);
    return request('https://maps.googleapis.com/maps/api/geocode/json?components=locality:'+parsedData.region+'&key=' + KEY);
}

function displayMap(data) {
    const parsedData = JSON.parse(data);
    initMap(parsedData.results[0].geometry.location);
}

function handleError(err) {
    console.error(err);
}

function generateUser(){
    request('http://uinames.com/api/?amount=1')
    .then(displayUser, handleError)
    .then(getGeoCoordinates, handleError)
    .then(displayMap, handleError)
    .catch(handleError);
}

document.getElementById('generate-user').addEventListener('click', generateUser);