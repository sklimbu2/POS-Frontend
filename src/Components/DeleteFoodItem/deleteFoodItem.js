import './deleteFoodItem.css'
import { IoMdCloseCircleOutline } from "react-icons/io";
const deleteFoodItem = ({item, setIsClickedDelete, handleDelete})=>{
    return(
        <div className='deleteFoodItem' >
            <div className='Dark-Background' onClick={()=>setIsClickedDelete(false)}></div>
            <div className='deleteFoodItem-content'>
                <IoMdCloseCircleOutline className='deleFoodItem-closeIcon' onClick={()=> setIsClickedDelete(false)} />
                <h3>Are you sure, Delete this Item?</h3>
                <div className='deleteFoodItem-card'>
                    <img 
                        src={`https://pos-backend-fypx.onrender.com${item.imageUrl}`} alt={item.name} 
                        className='food-image' 
                    />
                    <div className='food-details'>
                                    <h3 className='foodName'>{item.name}</h3>
                                     <div className='price-times'>
                                        <p className='foodPrice'>$ {item.price}</p>
                                    </div>
                                </div>
                </div>
                <button className='deleteButton' onClick={()=>handleDelete(item.name,item.imageUrl)}>Yes Delete it!</button>
            </div>
        </div>
    )
}
export default deleteFoodItem