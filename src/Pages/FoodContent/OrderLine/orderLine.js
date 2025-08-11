import './orderLine.css'
import {useState} from 'react'
import SingleOrder from './SingleOrder/singleOrder';
import { IoTrashOutline } from "react-icons/io5";
const OrderLine = ({
    postOrders, 
    error, 
    isLoading,
    setCurrentOrders, 
    setPaidStatus, 
    deleteOrder, 
    setMessage,
    fetchOrders
}) =>{
    const [selectedOrder, setSelectedOrder] = useState()
    if (isLoading) {
        return (
            <div className="orderLine-loading">
                <p>Loading orders...</p>
                {/* Consider adding a spinner here */}
            </div>
        );
    }
    if (error) {
        return (
            <div className="orderLine-error">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }
    if (postOrders.length === 0) {
        return (
            <div className="orderLine-empty">
                <p>No orders found</p>
            </div>
        );
    }
    function updateCurrentOrder(item){
        setCurrentOrders(item)
        setPaidStatus(true)
    }
    return(
        <div className='orderLine'>
            <h2 className='header'>Order Line</h2>
            <div className='orderLine-Content'>
            <div className='orderLine-cards'>
                {postOrders && postOrders.map((item) => (
                    <div className='orderLine-card' key={item.id} onClick={()=>updateCurrentOrder(item)}>
                        <ul>
                            <li className='orderNumber'>Order Number: #{item.id}</li>
                            <li><h3 className='totalAmount'>Total Amount: ${item.total_amount}</h3></li>
                            <li className='datetime'>Created Date: {item.created_date}</li>
                            <li className='datetime'>Created Time: {item.created_time}</li>
                        </ul>
                        <IoTrashOutline className='order-deleteBtn' onClick={()=>setSelectedOrder(item)}/>
                    </div>
                ))}
            </div>
            </div>
            {selectedOrder && 
            <SingleOrder 
                selectedOrder={selectedOrder} 
                setSelectedOrder={setSelectedOrder} 
                deleteOrder={deleteOrder} 
                setMessage = {setMessage}
                fetchOrders={fetchOrders}
            />}
        </div>
    )
}
export default OrderLine