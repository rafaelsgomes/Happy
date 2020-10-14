import React from 'react'
import {FiPlus} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {Map, TileLayer} from 'react-leaflet'

import mapMarker from '../images/map-marker.svg'
import '../styles/pages/orphanage-map.css'
import 'leaflet/dist/leaflet.css'

function OrphanagesMap(){
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esparando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Mogi das Cruzes</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            <Map 
                center={[-23.5318638,-46.2169642]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to='' className='create-orphanage'>
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap