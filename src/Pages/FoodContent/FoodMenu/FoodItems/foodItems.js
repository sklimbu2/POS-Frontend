import './foodItems.css'
import FoodItem from './FoodItem/foodItem';

const FoodItems = ({currentOrders, setCurrentOrders, menuItems, clickedEdit}) =>{
    return(
    <div className='food-items'>
        {menuItems && menuItems.map((item) =>(
            <FoodItem 
                item={item} 
                currentOrders={currentOrders} 
                setCurrentOrders={setCurrentOrders} 
                key={item.name}
                clickedEdit ={clickedEdit}
            />    
        ))}
    </div>
    )
}
export default FoodItems