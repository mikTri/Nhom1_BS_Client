import { useState } from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import TextField from '@mui/material/TextField';

const PasswordBox = ({ label, name, inputIndex, setInputIndex, changeInput2 }) => {
    const [isShowPassword, setisShowPassword] = useState(false);

    return (
        <div className='form-group'>
            <div className="passwordBox">
                <div className={`form-group position-relative ${inputIndex && 'focus'}`}>
                    {/* <span className='icon'><RiLockPasswordFill /></span> */}
                    <TextField
                        type={isShowPassword ? 'text' : 'password'}
                        className='w-100'
                        label={label}
                        onFocus={() => setInputIndex(true)}
                        onBlur={() => setInputIndex(false)}
                        name={name}
                        onChange={changeInput2}
                        variant="outlined"
                    />
                    <span className='toggleShowPassword' onClick={() => setisShowPassword(!isShowPassword)}>
                        {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                </div>
            </div>
        </div>
        
    );
}

export default PasswordBox;