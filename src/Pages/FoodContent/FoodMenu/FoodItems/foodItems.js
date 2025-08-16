import './foodItems.css'
import FoodItem from './FoodItem/foodItem';

const FoodItems = ({
    currentOrders, 
    setCurrentOrders,
    menuItems, 
    clickedEdit,
    deleteMenuItem,
    setMessage,
    fetchFoodData
}) =>{
        if(menuItems.length === 0){
        return(
            <div>
                <p>No More Food Items...</p>
            </div>
        )
    }
    return(
    <div className='food-items'>
        {menuItems && menuItems.map((item) =>(
            <FoodItem 
                item={item} 
                currentOrders={currentOrders} 
                setCurrentOrders={setCurrentOrders} 
                key={item.name}
                clickedEdit ={clickedEdit}
                deleteMenuItem={deleteMenuItem}
                setMessage={setMessage}
                fetchFoodData={fetchFoodData}
            />    
        ))}
    </div>
    )
}
export default FoodItems