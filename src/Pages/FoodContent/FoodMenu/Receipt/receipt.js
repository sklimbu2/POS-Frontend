import {useState} from 'react'
import './receipt.css'
import { GoPencil } from "react-icons/go";
import { AiOutlinePrinter } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
const Receipt = ({
    currentOrders, 
    setCurrentOrders, 
    paidStatus, 
    setPaidStatus, 
    createOrder,
    setMessage,
    fetchOrders
}) => {
    const [comment, setComment] = useState(false)
    function resetCurrentOrder(){
        setCurrentOrders([])
        setPaidStatus(false)
    }
    const onSubmit = () =>{
        if(createOrder()){
            setMessage('New Order Added......')
            resetCurrentOrder()
            fetchOrders()
        }
    }
    const GetReceipt = () => {

        return(    
        <div className='receipt-content'>
            <div className='receipt-half'>
                <div className='flex-space receipt-buttons'>
                    <button onClick={() => resetCurrentOrder()} id='receipt-clear'>Clear All Receipt</button>
                    <div>
                        <button id='edit-icon' onClick={()=>setComment(!comment)}><GoPencil /></button>
                    </div>
                </div>
                <h2 className='logo'>THE SHOP-POS</h2>
                <h3 className='receipt-header'>Order Number: #{currentOrders.id }{paidStatus && <i style={{color:'red', fontSize:'12px'}}><u>(paid)</u></i>}</h3>
               {paidStatus && <p className='item-text'>  Created Date: {currentOrders.created_date}</p>}
               {paidStatus && <p className='item-text'> Created Time: {currentOrders.created_time} </p>}
                <div className='receipt-line'></div>  
                <h3 className='receipt-header'>Order Items</h3>
                <div className='receipt-items'>
                    {currentOrders.items.map((item) => (
                        <div key={item.name} className='flex-space'>
                            <h5 className={item.times > 1 ? 'item-text underline' : 'item-text '}>
                                <span className='item-times'>{item.times}x</span> 
                                {item.name}
                                <MdAdd 
                                    className={comment ? 'addComment' : 'addComment noDisplay'}
                                    onClick={()=>setComment(!comment)}
                                />
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
                            <h5 className='item-text'>{ '$ ' +(currentOrders.total_amount).toFixed(2)}</h5>
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
                    <h3 className='receipt-header'>{ '$ ' +currentOrders.total_amount}</h3>
                </div>
            </div>
            <div className='receipt-half'>
                <button id='receipt-printer' onClick={() => onSubmit()}><AiOutlinePrinter id='printer-icon'/>Place Order</button>
            </div>
        </div>
    )
    }
    const BlankReceipt = () =>{
        return(
        <div className='receipt-content'>
            <div className='receipt-half'>
                
                <h2 className='logo'>THE SHOP-POS</h2>
                <h3 className='receipt-header'>Order Number: #</h3>
                <div className='receipt-line'></div>  
                <h3 className='receipt-header'>Order Items</h3>
                <div className='receipt-items'>
                      
                </div>
                <div className='receipt-payment'>
                    <h3 className='receipt-header'>Payment Summary</h3>
                    <div className='receipt-items'>
                        <div className='flex-space'>
                            <h5 className='item-text'>Subtotal</h5>
                            <h5 className='item-text'>$0.00</h5>
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
                    <h3 className='receipt-header'>$0.00</h3>
                </div>
            </div>
        </div>
        )
    }
    return(
        <div className='receipt'>
            {(currentOrders.length !== 0) ? 
               <GetReceipt 
                    
               />
            : <BlankReceipt />}
        </div>
    )
}

export default Receipt