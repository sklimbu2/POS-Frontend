import './messageBox.css'
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import {useState, useEffect} from 'react'
const MessageBox = ({message, setMessage}) => {
    useEffect(()=>{
        const timer = setTimeout(()=> setMessage(),2000);
         return () => clearTimeout(timer); // Cleanup
    },[]);
    return(
        <div className={`messageBox ${message ? '' : 'close'}`}>
            <div className='messageBox-content'>
                <FaRegMessage className='messageIcon'/>
                <h3 className='messageText'>{message}</h3>
            </div>
            <IoMdClose className='messageClose' onClick={()=>setMessage()}/>
        </div>
    )
}
export default MessageBox