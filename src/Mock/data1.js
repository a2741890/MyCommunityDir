//使用Mock
// import Mock from 'mockjs';
import Mock from 'mockjs-async';
import axios from 'axios';

const userNameSamples = [
    "William",
    "Michelle",
    "James",
    "George",
    "Sina",
    "Paul",
    "Anna"
];

const noteSamples = [
    "I really love this place!",
    "The coffee here is the best.",
    "Good place to find Asian food.",
    "Service is good, food is nice and overall a great place to spend time with family.",
    "Guests liked the large, clean rooms, though some commented maintenance could be improved · Guests appreciated the large bathrooms",
    "Staff were excellent. Friendly, attentive, prompt. Food was good. Everything was cooked well. Great flavours",
    "OMG Amazing food, great staff! you need to have dinner here, try the deserts...….  WOW SO GOOD!!!"
];

const locations = [
    "Starbucks",
    "Asian Restaurant",
    "BigW",
    "Cinema",
    "Casino",
    "Joy Seafood Restaurant",
    "Theme Park"
]

export default Mock.mock(RegExp('/getdata' + '.*'), 'get', (options) => {
    var url_string = options.url; //window.location.href
    var url = new URL(url_string);
    var currentLat = url.searchParams.get("currentLat");
    var currentLng = url.searchParams.get("currentLng");
    var keyword = url.searchParams.get("keyword").toLowerCase();
    var searchBy = url.searchParams.get("searchBy");
    var filteredUserNameSamples = userNameSamples;
    var filteredNoteSamples = noteSamples;
    var key = `markers|${userNameSamples.length}`;

    if (searchBy === 'Name') {
        filteredUserNameSamples = userNameSamples.filter(u => u.toLowerCase().includes(keyword));
        key = `markers|${filteredUserNameSamples.length}`
    }

    if (searchBy === 'Note Content') {
        filteredNoteSamples = noteSamples.filter(n => n.includes(keyword));
        key = `markers|${filteredNoteSamples.length}`
    }

    console.log(filteredUserNameSamples);

    var template = {
        [key]: [{
            'id|+1': 1,
            'userName|+1': searchBy ? filteredUserNameSamples : userNameSamples,
            'note|+1': searchBy ? filteredNoteSamples : noteSamples,
            'location|+1': locations,
            'lng': `@integer(${currentLng * 1000000 - 20000}, ${currentLng * 1000000 + 20000})`,
            'lat': `@integer(${currentLat * 1000000 + 20000}, ${currentLat * 1000000 - 20000})`
        }]
    };

    var response = Mock.mock(template);

    return response;
})

// async function getLocationName(marker) {

//     var location = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//         params: {
//             latlng: '40.714224,-73.961452',
//             key: 'AIzaSyA7zr8qm_3rHfBJq1ZAaAXKxlmeessxsoc',
//             location_type: 'ROOFTOP',
//             result_type: 'street_address'
//         }
//     })
//         .then(res => {
//             return res.data.results[0].address_components[0].long_name + ', ' + res.data.results[0].address_components[1].long_name;
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     return location;
// }
