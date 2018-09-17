# Random User Generator

## Purpose

This project was created for the purposes of gaining practice in chaining promises. It was created using 4 seperate APIs,with each subsequently called API consuming the data from a previous API response. Once "New User" is clicked a request is made to the UI Names API for random user data. The returned JSON is then used to generate a pixel portrait using the user's name as a seed for random generation and the user's returned data to specify the gender of the requested portrait. Next, a request is made to Google's Geocoding API for the user's geocoordinates using the user's region. These geocoordinates are then used in a request made to the Google Maps API to generate an interactive map showing the users country.

## How To Run

you can either visit [this website](http://random-user.surge.sh/), or download/clone this repository. in the root directory of your local version of this project you will need to create a `config.js` file and in it place an API key that is valid for both the Google Maps and Google Geocoding API store this in a variable called `KEY`

``` javascript
const KEY = 'YOUR_API_KEY'
```

## APIs Used

- [UI Names](https://github.com/thm/uinames) (for generating random user data)
- [Google's map and geocoding APIs](https://developers.google.com/)
- [Dicebear Avatars](https://avatars.dicebear.com/) (for generating pixelated portraits)