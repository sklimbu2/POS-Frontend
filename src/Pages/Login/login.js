import Wallpaper from '../../assets/wallpaper.jpg'
import './login.css'
const Login = () =>{
    return(
        <div className='login'>
            <div className='login-half'>
                <h2 className='logo'>THE SHOP POS</h2>
                <form className='login-form'>
                    <p className='login-subHeader'>Sart your Journey</p>
                    <h3 className='login-header'>Shop Management System</h3>
                    <div className='login-inputFields'>
                        <div className='login-inputField'>
                            <p className='inputField-text'>Username</p>
                            <input 
                                type='text' 
                                className='inputTag' 
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='login-inputField'>
                            <p className='inputField-text'>Password</p>
                            <input 
                                type='password' 
                                className='inputTag' 
                                placeholder='Enter your password'
                            />
                        </div>
                    </div>
                    <button className='login-btn'>Login In</button>
                </form>
            </div>
            <div className='login-half'>
                <img src={Wallpaper} alt='Wallpaper' className='login-wallpaper'/>
            </div>
        </div>
    )
}
export default Login