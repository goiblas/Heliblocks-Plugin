import { useState, useEffect } from "@wordpress/element";
import { Button, TextareaControl, Spinner, Dashicon } from "@wordpress/components";
import { Icon, warning } from '@wordpress/icons';
import { dispatch } from '@wordpress/data';
import Card from "./ownCard";
import { i18n } from "../../utils";

const LOCALSTORAGE_KEY = "heliblocks-token";

const Account = ({ onChoose }) => {
    const [ token, setToken ] = useState("")
    const [ hasError, setHasError] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ heliblocks, setHeliblocks ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const localToken  = localStorage.getItem(LOCALSTORAGE_KEY)
        if(localToken) {
            loadData(localToken)
        }
    }, [])

    useEffect(() => {
        let mounted;
        if(hasError) {
            mounted = true;
            setToken("")
            setTimeout(() => {
                if(mounted) {
                    setHasError(false)
                }
            }, 1500);
        }
        return () => {
            mounted = false
        }
    }, [hasError])

    const loadData = async (currentToken) => {
        setLoading(true)
        try {
            const url = "https://us-central1-heliblocks.cloudfunctions.net/api"
            const options = { 
                headers: {
                    Authorization: 'Bearer ' + currentToken
                  }
            };
    
            const response = await fetch(url, options).then( res => res.json())
            if(response.error) {
                setHasError(true)
            } else {
                setUser({
                    displayName: response.displayName,
                    photoURL: response.photoURL
                })
                const heliblocksSorted = response.heliblocks.sort((a,b) => b.lastUpdate._seconds - a.lastUpdate._seconds)
                setHeliblocks(heliblocksSorted);
                localStorage.setItem(LOCALSTORAGE_KEY, currentToken);
            }
        
        } catch (error) {
            setHasError(true)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setToken("")
        setUser(null)
        localStorage.removeItem(LOCALSTORAGE_KEY)
    }
    if(loading) {
        return <div role="alert" style={{display: "flex", alignItems: "center"}}>
                    <Spinner />{i18n("Loading")}
                </div>
    }
    if(!user) {
        return (
            <div style={{maxWidth: "480px"}}>
                {hasError && (<div style={{color: "#c82c2d", display: "flex", padding: ".5rem 0"}}><Dashicon icon="warning" style={{marginRight: ".5rem"}} /> Invalid token</div>)}
                <div>
                    <TextareaControl
                        label={i18n("Introduce your token")}
                        help={<>{i18n("You can get it in")} <a href="https://heliblocks.com/account-settings" target="_blank">heliblocks.com/account-settings</a></>}
                        value={ token }
                        onChange={ ( text ) => setToken( text) }
                    />
                </div>
                <Button disabled={!token} isPrimary onClick={() => loadData(token)}>{i18n("Validate token")}</Button>
            </div>
        )
    }

    return (
        <div>
            <div style={{padding: "0 0 1rem", textAlign: "right"}}>
                <img src={user.photoURL} style={{ width: "32px",  height: "32px", objectFit: "cover", borderRadius: "50%", verticalAlign: "middle", marginRight: ".5rem" }} />
                {user.displayName}
                <Button onClick={logout}>logout</Button>
            </div>
            <div style={{padding: "1rem 0 3rem"}} className="hb-grid-cards">
                {heliblocks.map( ({ title,  screenshot, objectID, lastUpdate, source }) => (
                    <Card 
                        key={objectID}
                        title={title}
                        screenshot={screenshot}
                        lastUpdate={lastUpdate}
                        onClick={() => onChoose(source)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Account;