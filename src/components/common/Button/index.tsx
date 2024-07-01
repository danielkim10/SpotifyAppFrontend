import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';

const Button = (props: { label: string, hasAvatar?: boolean, avatarImage?: string, avatarLabel?: string, endIcon?: string, dropdownOpen?: boolean, bgColorScheme?: string, handleClick: (e: any) => void }) => {
    const {
        label,
        hasAvatar,
        avatarImage,
        avatarLabel,
        endIcon,
        dropdownOpen,
        bgColorScheme,
        handleClick
    } = props;

    const colorSchemes: {[key:string]:string} = {
        'grey': 'bg-grey hover:bg-light-grey',
        'red': 'bg-light-red hover:bg-light-red-confirm text-white',
        'green': 'bg-green hover:bg-green-confirm text-white'
    }

    return (
        <div className={`flex p-[10px] m-[10px] h-max items-center cursor-pointer ${colorSchemes[bgColorScheme!!]} rounded-full justify-between `} onClick={handleClick}>
            {
                hasAvatar ?
                    avatarImage ?
                        <Avatar alt={avatarLabel} src={avatarImage} className="mx-[2.5px]"></Avatar> : 
                        <Avatar alt={avatarLabel} className="mx-[2.5px]">{avatarLabel?.slice(0,1)}</Avatar> 
                    : <></>
            }
            
            <b className="mx-[2.5px]">{label}</b>
            {
                endIcon === "dropdown" ?
                <Icon>{dropdownOpen ? "expand_less_rounded" : "expand_more_rounded"}</Icon>
                :
                endIcon ?
                    <Icon>{endIcon}</Icon> : <></>
            }
        </div>
    );
}

export default Button;