import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";


const QuantityBox = (props) => {

    const [inputVal, setInputVal] = useState(1);
    const context = useContext(MyContext);

    // 
    useEffect(() => {
        if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
            setInputVal(parseInt(props?.value))
        }
    }, [props.value])


    // 
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setInputVal(value);
            context.setAlertBox({ open: false });
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Vui lòng nhập số lượng hợp lệ"
            });
        }
    };


    // 
    const minus = () => {
        if (inputVal !== 1 && inputVal > 0) {
            setInputVal(inputVal - 1);
        }
    }

    // 
    const plus = () => {
        setInputVal(inputVal + 1);
        // let stock = parseInt(props.item.countInStock);
        // if(inputVal<stock){
        //     setInputVal(inputVal + 1);
        // }else{
        //     context.setAlertBox({
        //         open:true,
        //         error:true,
        //         msg:"The quantity is greater than product count in stock"
        //     })
        // }
    }

    // 
    useEffect(() => {
        if (props.quantity) {
            props.quantity(inputVal)
        }

        if (props.selectedItem) {
            props.selectedItem(props.item, inputVal);
        }

    }, [inputVal]);



    
    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button onClick={minus} disabled={inputVal <= 1}><FaMinus /></Button>
            <input type="number" min="1" value={inputVal} onChange={handleInputChange} />
            <Button onClick={plus}><FaPlus /></Button>
        </div>
    )
}

export default QuantityBox;