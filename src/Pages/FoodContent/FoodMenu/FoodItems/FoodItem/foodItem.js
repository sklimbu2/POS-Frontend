import {useState, useEffect} from 'react'
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import Card from '../../../../../Components/EditandDeleteCard/card'
const FoodItem = ({currentOrders, setCurrentOrders, item, clickedEdit}) => {
    const [times, setTimes] = useState(0)
    useEffect(()=>{
        if(currentOrders && currentOrders.items){
            const foundItem = currentOrders.items.find(currentItem => 
                currentItem.name === item.name
            )
            setTimes(
                foundItem ? foundItem.times : 0
            )
        }
    },[currentOrders,item.name])
    const createNewOrder = (item) => {
        //get unique Id
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const randomDigits = Array.from({length: 3}, () => Math.floor(Math.random() * 10)).join('');
        const newId = randomLetter+randomDigits
    
        const newOrder ={
            "id" : newId,
            "items" : [{"name" : item.name, "amount" : item.price, "times" : 1}],
            "total_amount": item.price
        }
        setCurrentOrders(newOrder)
    }
    const updateOrder = (item) =>{
        const givenName = item.name
        const givenPrice = item.price
        setCurrentOrders(prevOrder => {
            // Check if the item already exists
            const itemExists = prevOrder.items.some(item => 
                item.name === givenName
            )
            // Update the items array times
            let updatedItems
            if(itemExists){
                updatedItems = prevOrder.items.map(item =>
                item.name === givenName
                ? { ...item, times : item.times + 1  }  // Update only the amount (or other fields)
                : item
                )
            }
             else{
                const newItem = {name: givenName,amount:givenPrice, times:1 }
                updatedItems=[...prevOrder.items, newItem]
            }
            // Calculate the new total_amount
            const newTotalAmount = updatedItems.reduce(
                (sum, item) => sum + (item.amount * item.times),0
            );
            // Return the fully updated order
            return {
                ...prevOrder,
                items: updatedItems,
                total_amount: parseFloat(newTotalAmount.toFixed(2)) // Ensure 2 decimal places
            };  
        });
    }
    const handleIncrement = (item) => {
        setTimes(prevTimes => prevTimes + 1)
         if(currentOrders.length === 0){
           createNewOrder(item)
        }
        else{
            console.log('no data...')
            updateOrder(item)
        }
    }
    const handleDecrement = (item) => {
        if(times > 0 ){
            setTimes(prevTimes => prevTimes - 1)
            const givenName = item.name
            setCurrentOrders(prevOrder => {
                // Update the items array times
                const updatedItems = prevOrder.items.map(item =>
                    item.name === givenName
                    ? { ...item, times : item.times - 1  }  // Update only the amount (or other fields)
                    : item
                )
                const filteredItem = updatedItems.filter(item => item.times !== 0)
                // Calculate the new total_amount
                const newTotalAmount = filteredItem.reduce(
                    (sum, item) => sum + (item.amount * item.times), 0
                );
                // Return the fully updated order
                return {
                    ...prevOrder,
                    items: filteredItem,
                    total_amount: parseFloat(newTotalAmount.toFixed(2)) // Ensure 2 decimal places
                };  
            });
        }
    }
    return(
        <div className='food-item' >
            {clickedEdit && <Card /> }
            <img 
                src={`https://pos-backend-fypx.onrender.com${item.imageUrl}`} alt={item.name} 
                className='food-image' 
                onClick={()=> handleIncrement(item)}
            />
            <div className='food-details'>
                <h3 className='foodName'>{item.name}</h3>
                 <div className='price-times'>
                    <p className='foodPrice'>$ {item.price}</p>
                    <div className='increment-decrement'>
                        <RiSubtractFill 
                            onClick={()=> handleDecrement(item)}
                            id='decrementBtn'    
                        />
                        <input 
                            type='number' 
                            min='0'
                            value={times} 
                            id='numberInput'
                            readOnly
                        />
                        <MdAdd 
                            onClick={()=> handleIncrement(item)} 
                            id='incrementBtn'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FoodItem