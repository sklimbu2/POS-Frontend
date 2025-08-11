import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import './card.css'
const Card = () => {
    return(
        <div className='EditDelete-card'>
            <IoTrashOutline className='card-deleteBtn'/>
            <div className='card-editBtn'><GoPencil className='card-editIcon' /></div>
        </div>
    )
}
export default Card