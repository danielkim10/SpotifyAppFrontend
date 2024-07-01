import { Input as BaseInput } from '@mui/base/Input';

const Input = () => {
    const slotProps = {
        root: {
            className: `bg-grey text-white`
        }
    }
    return <BaseInput slotProps={slotProps}/>;
}

export default Input;