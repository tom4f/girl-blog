import { useEffect } from 'react';
import alertStyle from '../styles/Alert.module.css'

export const AlertBox = ( { alert: { header = '', text = '', color= 'red' } } ) => {

    return (
        header ? <article className = { alertStyle.alert } style = {{ color }}>
                    <header className = { alertStyle.header }>{ `${ header }` }</header>
                    <header className = { alertStyle.text }>{ `${ text }` }</header>
                 </article>
               : null
    )
}


export const Delay = ( alert = { header: '', text: '' }, setAlert ) => {
    
    const delay = () => {
        // set empty Alert text
        const clearAlertText = () => setAlert( { header: '', text: '' } )
        // run clearing after 5s
        const timeout = setTimeout( clearAlertText, 5000 )

        return () => clearTimeout( timeout )
    }
    useEffect( delay, [ alert ] )
}