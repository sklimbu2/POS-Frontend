import { CiForkAndKnife } from "react-icons/ci";
import { FaShuttleVan } from "react-icons/fa";
import { LuBaggageClaim } from "react-icons/lu";
import './content.css'

import {useState} from 'react'
import FoodContent from "../../Pages/FoodContent/foodContent"
import Cargo from '../../Pages/Cargo/cargo'
import Luggage from '../../Pages/Luggage/luggage'
const Content = () => {
    const [section, setSection] = useState('food')
    const icons = [
        {id : 'food', icon: <CiForkAndKnife className='sideNav-icon'/>},
        {id : 'cargo', icon: <FaShuttleVan className='sideNav-icon'/>},
        {id : 'luggage', icon: <LuBaggageClaim className='sideNav-icon'/>}
    ]
    return(
        <div className='posContent'>
            <ul className='sideNav'>
            {icons.map((item) => (
                <li key={item.id}>
                    <div
                        className={`sideNav-icons ${section === item.id ? 'sideNav-clicked' : ''}`}
                        onClick={() => setSection(item.id) }
                    >
                        {item.icon}
                    </div>
                </li>
            ))}
            </ul>
            {(section === 'food') && <FoodContent />}
            {(section === 'cargo') && <Cargo />}
            {(section === 'luggage') && <Luggage />}
        </div>

    )
}
export default Content