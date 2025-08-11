import {useState, useEffect} from 'react'
import './foodMenu.css'
import Receipt from './Receipt/receipt'
import FoodItems from './FoodItems/foodItems';
import AddFood from '../../../Components/AddFoodItem/addFood'
import { IoFastFoodOutline } from "react-icons/io5";
import { PiBowlFood } from "react-icons/pi";
import { RiDrinksLine } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
const FoodMenu = ({
    currentOrders, 
    setCurrentOrders,
    paidStatus, 
    setPaidStatus, 
    createOrder,
    setMessage,
    FoodData,
    errorFoodData,
    isLoadingFoodData,
    fetchOrders,
    fetchFoodData
}) =>{
    const [isClicked, setIsClicked] = useState('All Category')
    const [clickedAdd, setClickedAdd] = useState(false)
    const [clickedEdit, setClickedEdit] = useState(false)
    const FoodCategory = [
        {id: '1', name: 'All Category', icon: <IoFastFoodOutline className='category-icon' />},
        {id: '2', name: 'Main Course', icon: <PiBowlFood className='category-icon' />},
        {id: '3', name: 'Drinks', icon: <RiDrinksLine className='category-icon' />}
    ]
    if(isLoadingFoodData){
        return(
            <div>
                <p>Loading....</p>
            </div>
        )
    }
    if(errorFoodData){
        return(
            <div>
                <p>Error: {errorFoodData}</p>
                <button onClick={()=> window.location.reload()}>Retry</button>
            </div>
        )
    }
    if(FoodData.length === 0){
        return(
            <div>
                <p>No More Food Items...</p>
            </div>
        )
    }
    return(
        <div className='foodMenu'>
            {clickedAdd && <AddFood setClickedAdd = {setClickedAdd} fetchFoodData={fetchFoodData}/>}
            <div className='menu-half'>
                <div className='foodMenu-features'>
                    <h2 className='header'>Food Menu</h2>
                    <div className='foodMenu-feature'>
                        {clickedEdit ? 
                            <p className='foodMenu-text' onClick={()=>setClickedEdit(!clickedEdit)}><MdOutlineDone className='foodMenu-textIcon'/>Done Edit</p> :
                            <p className='foodMenu-text' onClick={()=>setClickedEdit(!clickedEdit)}><GoPencil className='foodMenu-textIcon'/>Edit Food Item</p> 
                        }
                        <p className='foodMenu-text' onClick={()=>setClickedAdd(true)}><MdAdd className='foodMenu-textIcon' />Add Food Item</p>
                    </div>
                </div>
                <div className='foodCategory'>
                {FoodCategory.map((item) => (
                    <div 
                        key={item.id} 
                        className={`category ${(isClicked === item.name ? 'categorySelected':'')}`} 
                        onClick={()=> setIsClicked(item.name)}
                    >
                        {item.icon}
                        <div className='category-details'>
                            <h4 className='category-name'>{item.name}</h4>
                            <p className='category-itemNumber'>
                                { FoodData &&
                                (item.name.toLowerCase()) == 'all category' ?
                                    FoodData.length :
                                    FoodData.filter(data=> (data.category.toLowerCase())=== (item.name.toLowerCase())).length
                                } items
                            </p>
                        </div>
                    </div>
                ))}
                </div>
                <FoodItems 
                currentOrders={currentOrders} 
                setCurrentOrders={setCurrentOrders}  
                menuItems={ (isClicked.toLowerCase()) === 'all category' ? 
                    FoodData :
                    FoodData.filter((item)=> (item.category.toLowerCase()) === (isClicked.toLowerCase()))
                }
                clickedEdit = {clickedEdit}
                />
               
            </div>
            <div className='menu-half'>
                <Receipt 
                    currentOrders={currentOrders} 
                    setCurrentOrders={setCurrentOrders} 
                    paidStatus = {paidStatus}
                    setPaidStatus = {setPaidStatus}
                    createOrder={createOrder}
                    setMessage={setMessage}
                    fetchOrders={fetchOrders}
                />
            </div>
        </div>
    )
}
export default FoodMenu