import React, {useEffect, useState} from 'react'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapMarker from '../images/map-marker.svg'
import '../styles/pages/orphanage-map.css'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(()=> {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    }, [])

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
            
            {orphanages.map(orphanage => {
                return (
                    <Marker
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]} 
                        key={orphanage.id}
                    >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#fff" />
                        </Link>
                    </Popup>
                    </Marker>
                )
            })}
            
            </Map>

            <Link to='/orphanages/create' className='create-orphanage'>
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap