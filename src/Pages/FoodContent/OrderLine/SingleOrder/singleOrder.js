
import './singleOrder.css'
const SingleOrder = ({ 
    selectedOrder, 
    setSelectedOrder, 
    deleteOrder, 
    setMessage,
    fetchOrders
}) => {
    const deleteSelected = (id) =>{
        if(deleteOrder(id)){
            setMessage(`Order: #${id} was deleted...`)
            setSelectedOrder()
            fetchOrders()
        }
    }
    return(
    <div className="singleOrder">
        <div className='Dark-Background' onClick={()=> setSelectedOrder()}></div>
        
            <div className='singleOrder-content'>
                <h3>Are you Sure?</h3>
            <div className='receipt-half'>
                <h2 className='logo'>THE SHOP-POS</h2>
                <h3 className='receipt-header'>Order Number: #{selectedOrder.id }</h3>
               <p className='item-text'> Created Date: {selectedOrder.created_date}</p>
               <p className='item-text'> Created Time: {selectedOrder.created_time}</p>
                <div className='receipt-line'></div>  
                <h3 className='receipt-header'>Order Items</h3>
                <div className='receipt-items'>
                    {selectedOrder && 
                    selectedOrder.items.map((item) => (
                        <div key={item.name} className='flex-space'>
                            <h5 className={item.times > 1 ? 'item-text underline' : 'item-text '}>
                                <span className='item-times'>{item.times}x</span> 
                                {item.name}
                            </h5>
                            <h5 className='item-text'>$ {(item.amount * item.times).toFixed(2)}</h5>
                        </div>
                    ))}    
                </div>
                <div className='receipt-payment'>
                    <h3 className='receipt-header'>Payment Summary</h3>
                    <div className='receipt-items'>
                        <div className='flex-space'>
                            <h5 className='item-text'>Subtotal</h5>
                            <h5 className='item-text'>{ '$ ' +(selectedOrder.total_amount).toFixed(2)}</h5>
                        </div>
                        <div className='flex-space'>
                            <h5 className='item-text'>Service Charge</h5>
                            <h5 className='item-text'>$0.00</h5>
                        </div>
                    </div>
                </div>
                <div className='receipt-line'></div> 
                <div className='flex-space'>
                    <h3 className='receipt-header'>Total Payable</h3>
                    <h3 className='receipt-header'>{ '$ ' +selectedOrder.total_amount}</h3>
                </div>
            </div>
            <div className='receipt-half'>
                <button id='receipt-printer' onClick={() => deleteSelected(selectedOrder.id)}>Yes, Delete it!</button>
            </div>
        </div>
        </div>
    )
}
export default SingleOrder