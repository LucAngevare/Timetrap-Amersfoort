import Cookie from "js-cookie";
import React from "react";
import lang from "../lang.json";
import Map from "../partials/Map.js";
import "mapbox-gl/dist/mapbox-gl.css";

class menuPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            settings: Cookie.get('settings')
        };
    }
    render(){
        let settings = this.state.settings;
        if(settings !== undefined){
            settings = JSON.parse(settings);
        }
        return (
            <>
                <Map settings={settings} interactive={false}></Map>
                <div className="menu">
                    <h1 className="title">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].menu}</h1>
                    <div className="options">
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].lang}</p>
                            <select id="lang-select" defaultValue={(settings?.lang ?? 'Nederlands')}>
                                <option value="Nederlands">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].nederlands}</option>
                                <option value="Engels">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].engels}</option>
                            </select>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].muziek}</p>
                            <select id="music-select" defaultValue={settings?.music === false ? 'Geen' : (settings?.music ?? 'Geen')}>
                                <option value="Geen">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].geen}</option>
                            </select>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].font}</p>                    
                            <select id="font-select" defaultValue={settings?.font ?? 'Gideon Roman'}>
                                <option value="Gideon Roman">Gideon Roman</option>
                                <option value="Playfair Display">Playfair Display</option>
                                <option value="Roboto">Roboto</option>
                            </select>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].kleur}</p>           
                            <select id="color-select" defaultValue={(settings?.color ?? 'Rood')}>
                                <option value="Rood">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].rood}</option>
                                <option value="Blauw">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].blauw}</option>
                            </select>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].naam}</p>
                            <input type="text" id="name-input" placeholder={lang[(settings?.lang ?? 'Nederlands').toLowerCase()].naam} defaultValue={settings?.name ?? ""} required/>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].tts}</p>
                            <select id="tts-select" defaultValue={settings?.tts ? 'Aan' : 'Uit'}>
                                <option value="Aan">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].aan}</option>
                                <option value="Uit">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].uit}</option>
                            </select>
                        </div>
                        <div>
                            <p>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].darkmode}</p>
                            <select id="darkmode-select" defaultValue={settings?.darkmode ? 'Aan' : 'Uit'}>
                                <option value="Aan">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].aan}</option>
                                <option value="Uit">{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].uit}</option>
                            </select>
                        </div>
                    </div>
                    <small id="error-msg"></small>
                    <button className="start-btn" onClick={() => {
                        let errorMsg = document.querySelector(`#error-msg`);
                        let langOpt = document.querySelector(`#lang-select`);
                        let musicOpt = document.querySelector(`#music-select`);
                        let fontOpt = document.querySelector(`#font-select`);
                        let colorOpt = document.querySelector(`#color-select`);
                        let nameOpt = document.querySelector(`#name-input`);
                        let ttsOpt = document.querySelector(`#tts-select`);
                        let darkmodeOpt = document.querySelector(`#darkmode-select`);

                        if(!langOpt || !musicOpt || !fontOpt || !colorOpt || !nameOpt || !ttsOpt || !darkmodeOpt || !errorMsg) return;

                        errorMsg.style.display = "none";

                        if(!/^[a-zA-Z- ]{1,30}$/.test(nameOpt.value)){
                            errorMsg.style.display = "block";
                            errorMsg.innerHTML = lang[(settings?.lang ?? 'Nederlands').toLowerCase()].requirements.naamReq;
                            return;
                        }

                        if(['Nederlands', 'Engels'].indexOf(langOpt.value) < 0) return;
                        if(['Geen'].indexOf(musicOpt.value) < 0) return;
                        if(['Gideon Roman', 'Roboto', 'Playfair Display'].indexOf(fontOpt.value) < 0) return;
                        if(['Rood', 'Blauw'].indexOf(colorOpt.value) < 0) return;
                        if(nameOpt.value.length === 0){
                            errorMsg.style.display = "block";
                            errorMsg.innerHTML = lang[(settings?.lang ?? 'Nederlands').toLowerCase()].requirements.naamLeeg;
                            return;
                        }
                        if(['Aan', 'Uit'].indexOf(ttsOpt.value) < 0) return;
                        if(['Aan', 'Uit'].indexOf(darkmodeOpt.value) < 0) return;

                        Cookie.set('settings', JSON.stringify({
                            darkmode: darkmodeOpt.value === "Aan",
                            tts: ttsOpt.value === "Aan",
                            lang: langOpt.value,
                            font: fontOpt.value,
                            music: musicOpt.value === "Geen" ? false : musicOpt.value,
                            name: nameOpt.value,
                            color: colorOpt.value,
                            viewPort: {
                                latitude: 52.1590,
                                longitude: 5.3852,
                                zoom: 17
                            }
                        }));

                        window.location.href = "/";
                    }}>{lang[(settings?.lang ?? 'Nederlands').toLowerCase()].start}</button>
                </div>
            </>
        )
    }
}

export default menuPage;