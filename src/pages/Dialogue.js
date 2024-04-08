import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Map from "../partials/Map.js";
import dutch_dialogues from "../dialogues/dutch.json";
import english_dialogues from "../dialogues/english.json";
import lang from "../lang.json";
import Cookies from "js-cookie";

function DialoguePartial(props){
    let dialogue = props.dialogue;
    let settings = props.settings;
    const [dialogueType, setDialogueType] = useState({
        index: 0,
        type: 0
    });
    if(!dialogue.dialoog[dialogueType.index]){
        let cookie = Cookies.get('Kie van de cookie') ?? '[]';
        try{
            cookie = JSON.parse(cookie);
        } catch {
            cookie = [];
        }
        if(cookie.indexOf(dialogue.id) < 0){
            cookie.push(dialogue.id);
        }
        Cookies.set('Kie van de cookie', JSON.stringify(cookie));
        return <Navigate to="/"></Navigate>
    };
    return (
        <div className="dialoguebg">
            <div className="dialogueinnerbox">
                <div className="image">
                    <img src={dialogueType.type === 0 ? (dialogue.dialoog[dialogueType.index]?.personage?.image ?? '/assets/images/nigger.png') : dialogue.dialoog[dialogueType.index][dialogueType.type]?.personage?.image ?? '/assets/images/nigger.png'} alt="Dialogue person" className="img"/>
                    <h1>{dialogueType.type === 0 ? (dialogue.dialoog[dialogueType.index]?.personage?.naam ?? 'Verteller') : (dialogue.dialoog[dialogueType.index][dialogueType.type]?.personage?.naam ?? 'Verteller')}</h1>
                </div>
                <div className="rightInner">
                    <p>"{dialogueType.type === 0 ? dialogue.dialoog[dialogueType.index].text.split("[NAME]").join(settings.name) : dialogue.dialoog[dialogueType.index][dialogueType.type].text.split("[NAME]").join(settings.name)}"</p>
                    {dialogueType.type === 0 ? (Array.isArray(dialogue.dialoog[dialogueType.index].options) ? dialogue.dialoog[dialogueType.index].options.map((option) => {
                        let component;
                        if(option.action === 1){
                            component = <button className="dialogue-btn" onClick={() => {
                                setDialogueType({
                                    type: 0,
                                    index: dialogueType.index + 1
                                });
                            }}>{option.text}</button>
                        } else if(option.action === 0){
                            component = <Link to="/"><button className="dialogue-btn">{option.text}</button></Link>
                        } else if(typeof option.action === 'string'){
                            component = <button className="dialogue-btn" onClick={() => {
                                setDialogueType({
                                    type: option.action,
                                    index: dialogueType.index + 1
                                });
                            }}>{option.text}</button>
                        }
                        return component;
                    }) : <button className="dialogue-btn" onClick={() => {
                        setDialogueType({
                            type: 0,
                            index: dialogueType.index + 1
                        });
                    }}>{lang[(settings.lang ?? 'Nederlands').toLowerCase()].verder}</button>) : <button className="dialogue-btn" onClick={() => {
                        setDialogueType({
                            type: 0,
                            index: dialogueType.index + 1
                        });
                    }}>{lang[(settings.lang ?? 'Nederlands').toLowerCase()].verder}</button>}
                </div>
            </div>
        </div>
    )
}

class Dialogue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            settings: Cookies.get('settings')
        };
    }
    render(){
        let locationId = window.location.pathname.split("/dialogue/").slice(1).join("/dialogue/").split("/")[0];
        if(!/^[0-9]{1,4}$/.test(locationId) || typeof this.state.settings === undefined){
            return (
                <Navigate to="/"></Navigate>
            );
        } else {
            let settings;
            try{
                settings = JSON.parse(this.state.settings);
            } catch {
                return (
                    <Navigate to="/menu"></Navigate>
                );
            }
            let dialogues = settings.lang === "Nederlands" ? dutch_dialogues : english_dialogues;
            locationId = parseInt(locationId);
            let dialogue = dialogues.coordinates.filter(c => c.id === locationId)[0];
            if(!dialogue){
                return (
                    <Navigate to="/"></Navigate>
                );
            } else {
                return(
                    <>
                        <DialoguePartial dialogue={dialogue} settings={settings}></DialoguePartial>
                        <Map settings={settings} interactive={false} active={locationId}></Map>
                    </>
                );
            }
        }
    }
}

export default Dialogue;