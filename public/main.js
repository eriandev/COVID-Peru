const API = 'https://erianvc.github.io/api/COVID-Peru/'

const worldInfected = document.getElementById('world-infected')
const worldRecovered = document.getElementById('world-recovered')
const worldDeaths = document.getElementById('world-deaths')

const localInfected = document.getElementById('local-infected')
const localRecovered = document.getElementById('local-recovered')
const localDeaths = document.getElementById('local-deaths')

const circleMarkerOpts = {
    radius: 6,
    fillColor: '#013825',
    color: '#013825',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
}

let map = L.map('map').setView([-9,-75.0282], 5)

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);



init()



function init(){
    
    updateLocalCases()
    updateWorldCases()
}

async function getData(URL){

    return await fetch(URL).then(res => res.json())
}

async function updateWorldCases(){

    const data = await getData(`${API}worldCases.json`)
    worldInfected.textContent = new Intl.NumberFormat().format(data.cases).replace(/\./g,' ')
    worldRecovered.textContent = new Intl.NumberFormat().format(data.recovered).replace(/\./g,' ')
    worldDeaths.textContent = new Intl.NumberFormat().format(data.deaths).replace(/\./g,' ')
}

async function updateLocalCases(){

    const data = await getData(`${API}localCases.json`)
    updateMapMarkers(data)

    localInfected.textContent = data.totalCases
    localRecovered.textContent = data.recovered
    localDeaths.textContent = data.deaths
}

function updateMapMarkers(data){

    data.details.forEach( the => {
        L.circleMarker([the.lat, the.lng], circleMarkerOpts).addTo(map).bindPopup(`${the.cases} ${the.cases > 1 ? 'casos confirmados' : 'caso confirmado'} en ${the.city}`)
    })
}
