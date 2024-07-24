import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import Logo from '../../assets/images/bookStoreLogo.png';
import GoogleImg from '../../assets/images/googleImg.png';

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";



const SignUp = () => {
    const context = useContext(MyContext);
    const history = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formfields, setFormfields] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        createdDate: Date.now()
    })

    //hiển thị các thành phần UI
    useEffect(() => {
        context.setIsHeaderFooterShow(false);
        return () => context.setIsHeaderFooterShow(true); 
    }, [context]);


    const onchangeInput = (e) => {
        setFormfields((prevFormfields) => ({
            ...prevFormfields,
            [e.target.name]: e.target.value
        }))
    }

    const register = (e) => {
        console.log(formfields)
        e.preventDefault();
        try {
            if (formfields.name === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng thêm đầy đủ họ tên!"
                })
                return false;
            }

            if (formfields.phone === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng thêm số điện thoại!"
                })
                return false;
            }

            if (formfields.address === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng thêm địa chỉ!"
                })
                return false;
            }

            if (formfields.email === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng thêm email!"
                })
                return false;
            }

            if (formfields.password === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng thêm mật khẩu!"
                })
                return false;
            }

            if (formfields.confirmPassword === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Vui lòng xác nhận lại mật khẩu!"
                })
                return false;
            }

            if (formfields.confirmPassword !== formfields.password) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Xác nhận lại mật khẩu không khớp!"
                })
                return false;
            }

            setIsLoading(true);

            postData("/api/user/signup", formfields).then((res) => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Tài khoản đã được đăng ký thành công!"
                    });

                    setTimeout(() => {
                        setIsLoading(true);
                        window.location.href = "/signIn";
                        // history("/signIn");
                    }, 2000);
                }

                else {
                    setIsLoading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    });
                }

            }).catch(error => {
                setIsLoading(false);
                console.error('Error posting data:', error);
            });

        } catch (error) {
            console.log(error)
        }


    }




    return (
        <section className="section signUpPage">

            <div className="shape-bottom"></div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo} alt="Logo" />
                    </div>

                    <h2 className="mb-3">Đăng ký</h2>


                    <form onSubmit={register}>
                        <div className="row">
                            {/* Text field: Name */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Họ và Tên" name="name" onChange={onchangeInput} type="text" required variant="standard" className="w-100" />
                                    {/* <TextField label="Họ và Tên" name="name" type="text" required variant="standard" className="w-100" /> */}
                                </div>
                            </div>

                            {/* Text field: Phone */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Số điện thoại" name="phone" onChange={onchangeInput} type="text" required variant="standard" className="w-100" />
                                    {/* <TextField label="Số điện thoại" name="phone" type="text" required variant="standard" className="w-100" /> */}
                                </div>
                            </div>
                        </div>

                        {/* Text field: Address */}
                        <div className="form-group">
                            <TextField label="Địa chỉ" name="address" onChange={onchangeInput} type="text" required variant="standard" className="w-100" />
                            {/* <TextField label="Địa chỉ" name="address" type="text" required variant="standard" className="w-100" /> */}
                        </div>

                        {/* Text field: Email */}
                        <div className="form-group">
                            <TextField id="standard-basic-email" label="Email" type="email" name="email" onChange={onchangeInput} variant="standard" className="w-100" />
                            {/* <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" name="email"/> */}
                        </div>

                        {/* Text field: Password */}
                        <div className="form-group">
                            <TextField id="standard-basic-password" label="Mật khẩu" name="password" onChange={onchangeInput} type="password" variant="standard" className="w-100" />
                            {/* <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" name="password"/> */}
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic-password" label="Xác nhận lại mật khẩu" name="confirmPassword" onChange={onchangeInput} type="password" variant="standard" className="w-100" />
                            {/* <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" name="password"/> */}
                        </div>


                        {/* sign in button */}
                        <div className="d-flex align-items-center mt-3 mb-3">
                            <div className="col-md-6">
                                <Button type="submit" disabled={isLoading === true ? true : false} className="btn-blue w-100 btn-lg btn-big">
                                    {isLoading === true ? <CircularProgress /> : 'Đăng ký'}
                                </Button>
                                {/* <Button type="submit" className="btn-blue w-100 btn-lg btn-big">Đăng ký</Button> */}
                            </div>
                            <div className="col-md-6 pr-0">
                                <Link to="/" className="d-block w-100">
                                    <Button className="btn-lg btn-big w-100" variant="outlined" onClick={() => context.setIsHeaderFooterShow(true)}>Hủy</Button>
                                </Link>
                            </div>
                        </div>


                        {/* sign up */}
                        <p className="txt">Bạn đã có tài khoản? <Link to="/signIn" className="border-effect">Đăng nhập</Link></p>

                        {/* sign in by social accounts */}
                        <h6 className="mt-4 text-center font-weight-bold">Bạn có thể đăng nhập bằng tài khoản mạng xã hội</h6>
                        <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} alt='google' /> Đăng nhập với Google</Button>

                    </form>



                </div>

            </div>
        </section>
    )
}

export default SignUp;