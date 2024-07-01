import { useContext } from 'react'
import HomeButton from './HomeButton'
import ProfileButton from './ProfileButton'
import HeaderContext from '../../../utilities/context/HeaderContext'

const Header = () => {
    const header = useContext(HeaderContext)

    return (
        <header className="bg-black min-h-default-header-height text-lg relative">
            <HomeButton/>
            <b className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">{header.name}</b>
            <ProfileButton/>
        </header>
    )
}

export default Header