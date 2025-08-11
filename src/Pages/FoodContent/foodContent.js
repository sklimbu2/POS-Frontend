import FoodMenu from "./FoodMenu/foodMenu"
import OrderLine from "./OrderLine/orderLine"
import MessageBox from "../../Components/MessageBox/messageBox"
import './foodContent.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
const FoodContent = () => {
    const [currentOrders, setCurrentOrders] = useState([])
    const [postOrders, setPostOrders] = useState([])
    const [paidStatus, setPaidStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [FoodData, setFoodData] = useState()
    const [isLoadingFoodData, setIsLoadingFoodData] = useState(true)
    const [error, setError] = useState(null);
    const [errorFoodData, setErrorFoodData] = useState(null)
    const [message, setMessage] = useState('this is testing..')
    const API_URL = 'https://pos-backend-fypx.onrender.com/api/v1/orders'
    const fetchOrders = async() => {
            try{
                const response = await axios.get(API_URL)
                setPostOrders(response.data)
                setError(null); // Clear any previous errors
            }catch(err){
                 console.error('Failed to fetch orders:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch orders')
            }
            finally {
                setIsLoading(false);
            }
    }
    const fetchFoodData = async() =>{
        try{
            const response = await axios.get(`${API_URL}/FoodData`)
            setFoodData(response.data)
            setErrorFoodData(null)
        }catch(error){
            setErrorFoodData(error.response?.data?.message || error.message || 'Failed to fetch Food items')
        }finally{
            setIsLoadingFoodData(false)
        }
    }
    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const createOrder = async() => {
        const currentDate = getCurrentDate()
        const CurrentTime = getCurrentTime()
        const newOrder = {
            ...currentOrders,
            created_date: currentDate,
            created_time: CurrentTime
        }
        try{
            await axios.post(API_URL, newOrder)
        }catch(error){
            console.log(error)
        }
    }
   const deleteOrder = async(id) => {
        try{
            await axios.delete(`${API_URL}/${id}`);
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    useEffect(() => {
        fetchOrders()
        fetchFoodData()
    },[])
    return(
        <div className='foodContent'>
            {message && <MessageBox message={message} setMessage={setMessage} />}
            <OrderLine 
                postOrders= {postOrders}
                isLoading={isLoading}
                error={error}
                setCurrentOrders = {setCurrentOrders}
                setPaidStatus = {setPaidStatus}
                deleteOrder ={deleteOrder}
                setMessage={setMessage}
                fetchOrders={fetchOrders}
            />
            <FoodMenu 
                currentOrders ={currentOrders}
                setCurrentOrders ={setCurrentOrders}
                paidStatus = {paidStatus}
                setPaidStatus= {setPaidStatus}
                createOrder = {createOrder}
                setMessage={setMessage}
                FoodData = {FoodData}
                errorFoodData = {errorFoodData}
                isLoadingFoodData = {isLoadingFoodData}
                fetchOrders={fetchOrders}
                fetchFoodData={fetchFoodData}
            />
        </div>
    )
}
export default FoodContent