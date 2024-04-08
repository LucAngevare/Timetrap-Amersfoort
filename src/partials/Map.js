import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import dutch_dialogues from "../dialogues/dutch.json";
import english_dialogues from "../dialogues/english.json";
import Mark from "./Mark.js";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function getColor(color = "rood"){
    switch (color.toLowerCase()){
        case 'rood':
            return '#e60b0b';
        case 'blauw':
            return '#461bf2';
        case 'grey':
            return '#828282';
        default:
            return '#e60b0b';
    }
}

function getSecondayColor(color = "rood"){
    switch (color.toLowerCase()){
        case 'rood':
            return '#940c0c';
        case 'blauw':
            return '#3212b3';
        case 'grey':
            return '#4a4949';
        default:
            return '#b80707';
    }
}

const viewPort = {
    latitude: 52.1590,
    longitude: 5.3852,
    zoom: 15
};

const mapContainer = {
    maxZoom: 20,
    minZoom: 14,
    bearing: 0,
    container: 'map',
    style: {width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0},
    mapboxAccessToken: process.env['AccessToken']
};

class containerMap extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    render(){
        let settings = this.props.settings;
        let dialogue = settings.lang === "Nederlands" ? dutch_dialogues : english_dialogues;
        let kieVanDeCookie = Cookies.get('Kie van de cookie') ?? '[]';
        try{
            kieVanDeCookie = JSON.parse(kieVanDeCookie);
        } catch {
            kieVanDeCookie = [];
        }
        let nextPoint = Math.max(...(kieVanDeCookie.length > 0 ? kieVanDeCookie : [0])) + 1;
        viewPort.latitude = settings?.viewPort?.latitude ?? viewPort.latitude;
        viewPort.longitude = settings?.viewPort?.longitude ?? viewPort.longitude;
        viewPort.zoom = settings?.viewPort?.zoom ?? viewPort.zoom;
        let activeId = this.props.active ?? undefined;
        return (
            <Map
                {...mapContainer}
                mapStyle={!settings?.darkmode ? "mapbox://styles/mapbox/streets-v12" : "mapbox://styles/mapbox/dark-v9"}
                initialViewState={viewPort}
                onDragEnd={(e) => {
                    if(typeof settings.viewPort !== 'object'){
                        settings.viewPort = viewPort;
                    }
                    settings.viewPort.latitude = e.viewState.latitude;
                    settings.viewPort.longitude = e.viewState.longitude;
                    settings.viewPort.zoom = e.viewState.zoom;
                    Cookies.set('settings', JSON.stringify(settings));
                }}
                interactive={this.props.interactive}
            >
                {dialogue["coordinates"].map((waypoint, ind) => (
                    <Marker
                        key={ind}
                        latitude={waypoint["coords"]["latitude"]}
                        longitude={waypoint["coords"]["longitude"]}
                    >
                        {this.props.interactive && nextPoint === waypoint.id ? <Link to={"/dialogue/"+waypoint.id}><Mark color={getColor(settings.color)} active={activeId} waypointId={waypoint.id}></Mark></Link> : <Mark color={kieVanDeCookie.indexOf(waypoint.id) >= 0 ? getColor('grey') : getSecondayColor(settings.color)} active={activeId} waypointId={waypoint.id}></Mark>}
                    </Marker>
                ))}
            </Map>
        );
    }
}

export default containerMap;