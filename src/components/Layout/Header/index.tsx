import { useContext } from 'react'
import HomeButton from './HomeButton'
import ProfileButton from './ProfileButton'
import HeaderContext from '../../../utilities/context/HeaderContext'

const Header = () => {
    const header = useContext(HeaderContext)

    return (
        <header>
            <div className="container">
                <HomeButton/>
                <div className="header-title">{header.name}</div>
                <ProfileButton/>
            </div>
        </header>
    )
}

export default Header