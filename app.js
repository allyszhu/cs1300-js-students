var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=J5my_TGn_5dYcPAeNIO08v7TuaTV3er7EA2hnL1bI24";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
    var x = new XMLHttpRequest();
    x.open("GET", corsApiUrl + options.url);
    x.send(options.data);
    return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
    new Promise((resolve, reject) => {
        const request = doCORSRequest({
            url: "https://trefle.io/api/v1/plants" + apiToken,
        });
        resolve(request);
    });

const updateGrid = () => {
    plantData.forEach(plant => {
        const card = createPlantCard(plant);
        document.getElementById('plant-grid').appendChild(card);
    });
}

const createPlantCard = (plant) => {
        let card = document.createElement('div');

        const name = document.createElement('h3');
        name.innerHTML = plant.common_name;
        name.setAttribute("class", "heading3");

        const img = document.createElement('img');
        img.src = plant.image_url;
        img.setAttribute("class", "image");
        // img.src = "/Users/allyszhu/Desktop/1.png"

        const family = document.createElement('p');
        family.innerHTML = plant.family_common_name;
        family.setAttribute("class", "subheading3");


        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(family);

        return card;
    }
    // // THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
    // corsPromise().then(
    //     (request) =>
    //     (request.onload = request.onerror = function() {
    //         // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
    //     })
    // );

let plantData = [];

corsPromise().then(
    (request) =>
    (request.onload = request.onerror = () => {
        let plantData = JSON.parse(request.response).data;
        console.log(plantData);
        plantData.forEach(plant => {
            const card = createPlantCard(plant);
            document.getElementById('plant-grid').appendChild(card);
        });
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////