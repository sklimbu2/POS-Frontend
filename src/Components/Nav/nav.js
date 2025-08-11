import profilePic from '../../assets/profile.webp'
import './nav.css'
const Nav = () => {
    return(
        <nav>
            <h2 className='logo'>The Shop-POS</h2>
            <div className='profile'>
                <img src={profilePic} alt='Profile' className='profile-img' />
                <div className='profile-detail'>
                    <h3 className='profile-name'>Shyam Limbu</h3>
                    <p className='profile-status'>Admin</p>
                </div>
            </div>
        </nav>
    )
}
export default Nav