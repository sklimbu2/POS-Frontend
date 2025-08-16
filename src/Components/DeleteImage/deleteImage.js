import {useState} from 'react'
import axios from 'axios'
const DeleteImage = () => {
    const [imageUrl, setImageUrl] = useState()
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            if(imageUrl){
            //const API_URL = `http://localhost:4000/api/v1/MenuItem/image?ImageUrl=${imageUrl}`
            const API_URL = `https://pos-backend-fypx.onrender.com/api/v1/MenuItem/image?ImageUrl=${imageUrl}`
            await axios.delete(API_URL)
        }
        else{
            console.log('Image Url is empty!')
        }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input
                value={imageUrl}
                onChange={(e)=> setImageUrl(e.target.value)}
            />
            <button>Submit Image url</button>
        </form>
    )
}
export default DeleteImage