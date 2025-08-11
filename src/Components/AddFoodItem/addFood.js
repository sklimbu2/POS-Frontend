import './addFood.css';
import { useState } from 'react';
import axios from 'axios';

const AddFoodItem = ({ setClickedAdd , fetchFoodData}) => {
    const [formData, setFormData] = useState({
        foodName: '',
        price: '',
        category: 'Main course',
        image: null
    });
    const [status, setStatus] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            setStatus('Please select an image file');
            return;
        }
        const data = new FormData();
        data.append('foodName', formData.foodName);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('image', formData.image);
        try {
            setStatus('Uploading...');
            
            const response = await axios.post('https://pos-backend-fypx.onrender.com/api/v1/orders/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });

            setStatus('Food item added successfully!');
            console.log('Upload response:', response.data);
            
            // Reset form after successful submission
            setTimeout(() => {
                setClickedAdd(false);
                setFormData({
                    foodName: '',
                    price: '',
                    category:'Main course',
                    image: null
                });
                setUploadProgress(0);
            }, 1500);
            fetchFoodData()
        } catch (error) {
            setStatus(`Error: ${error.response?.data?.message || error.message}`);
            console.error('Upload error:', error);
        }
    };

    return (
        <form className='addFood' onSubmit={handleSubmit}>
            <div className='Dark-Background' onClick={() => setClickedAdd(false)}></div>
            <div className='addFood-content'>
                <h2 className='header'>Add New Food</h2>
                <div className='addFood-fields'>
                    <div>
                        <p className='inputField-text'>Food Name</p>
                        <input 
                            type='text' 
                            name="foodName"
                            maxLength="20" 
                            className='inputTag'
                            placeholder='Enter New Food Name'
                            value={formData.foodName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <p className='inputField-text'>Price($)</p>
                        <input 
                            type='number' 
                            name="price"
                            placeholder='Amount($)'
                            min='0'
                            step="0.01"
                            className='inputTag'
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <label>Category:</label>
                    <select name='category' value={formData.category} onChange={handleInputChange}>
                        <option  value="Main course">Main Course</option>
                        <option  value="Drinks">Drinks</option>
                    </select>
                    <div>
                        <p className='upload-text'>Upload Image</p>
                        <input 
                            type='file' 
                            className='uploadTag'
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Upload Progress */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="upload-progress">
                            <progress value={uploadProgress} max="100" />
                            <span>{uploadProgress}% uploaded</span>
                        </div>
                    )}

                    {/* Status Message */}
                    {status && (
                        <div className={`status-message ${uploadProgress === 100 ? 'success' : 'error'}`}>
                            {status}
                        </div>
                    )}

                    <button type="submit" className='addFood-Btn'>
                        {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Add Food'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddFoodItem;