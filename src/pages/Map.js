//https://images0.persgroep.net/rcs/P7jVlCBl0cCg7adYjxhmKCOlrwY/diocontent/233287889/_fill/1350/900/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9

import React from "react";
import Cookie from "js-cookie";
import { Navigate, Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "../partials/Map.js";

class mapElement extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            settings: Cookie.get('settings')
        };
    }
    render() {
        if(window.location.pathname.split("#")[0].split("?")[0] === "/" && this.state.settings === undefined){
            return <Navigate to="/menu" replace/>   
        } else {
            let settings = JSON.parse(this.state.settings);
            return (
                <>
                    <Link to="/menu">
                        <button className="menuBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{color: settings.darkmode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </Link>
                    <Map settings={settings} interactive={true}></Map>
                </>
            );
        }
    }
}



export default mapElement;