import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import Logo from '../../assets/images/bookStoreLogo.png';
import GoogleImg from '../../assets/images/googleImg.png';

import { MyContext } from "../../App";
import { postData } from "../../utils/api";



const SignIn = () => {
    const context = useContext(MyContext);
    const { setIsLogin } = useContext(MyContext);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formfields, setFormfields] = useState({
        email: "",
        password: ""
    })


    useEffect(() => {
        context.setIsHeaderFooterShow(false);

        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true);
            navigate('/'); 
            context.setIsHeaderFooterShow(true);
        }
        else {
            navigate('/signIn'); 
        }

    }, [navigate, context]);


    const onchangeInput = (e) => {
        setFormfields((prevFormfields) => ({
            ...prevFormfields,
            [e.target.name]: e.target.value
        }))
    }

    const login = async (e) => {
        e.preventDefault();

        if (formfields.email === "") {
            context.setAlertBox({ open: true, error: true, msg: "Vui lòng thêm email!" })
            return false;
        }

        if (formfields.password === "") {
            context.setAlertBox({ open: true, error: true, msg: "Vui lòng thêm mật khẩu!" })
            return false;
        }

        setIsLoading(true);
        try {
            const res = await postData('/api/user/signin', formfields);
            if (!res.error) {
                localStorage.setItem("token", res.token);

                const user = {
                    name: res.user?.name,
                    email: res.user?.email,
                    userId: res.user?.id,
                    userImage: res.user?.images[0]
                }

                localStorage.setItem("user", JSON.stringify(user));

                context.setAlertBox({ open: true, error: false, msg: "Bạn đã đăng nhập thành công!" });
                setTimeout(() => { setIsLoading(false); navigate('/'); }, 2000);

            }
            else {
                context.setAlertBox({ open: true, error: true, msg: "Vui lòng kiểm tra lại thông tin đăng nhập!" });
                setIsLoading(false);
            }

        } catch (error) {
            context.setAlertBox({ open: true, error: true, msg: "Vui lòng kiểm tra lại thông tin đăng nhập!" });
            setIsLoading(false);
        }
    }


    return (
        <section className="section signInPage">

            <div className="shape-bottom"></div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo} alt="Logo" />
                    </div>

                    <h2 className="mb-3">Đăng nhập</h2>

                    <form className="mt-3" onSubmit={login}>
                        {/* fill in Username & password */}
                        <div className="form-group">
                            {/* <TextField id="standard-basic-email" label="Email" type="email" required variant="standard" className="w-100" name="email"/> */}
                            <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" name="email" onChange={onchangeInput} autoComplete="true" />
                        </div>
                        <div className="form-group">
                            {/* <TextField id="standard-basic-pasword" label="Password" type="password" required variant="standard" className="w-100" name="password"/> */}
                            <TextField id="standard-basic-pasword" label="Password" type="password" required variant="standard" className="w-100" name="password" onChange={onchangeInput} autoComplete="true" />
                        </div>


                        {/* forgot password */}
                        <a className="border-effect cursor txt">Bạn quên mật khẩu?</a>


                        {/* sign in button */}
                        <div className="d-flex align-items-center mt-3 mb-2">
                            <div className="col pl-0">
                                {/* <Button type="submit" className="btn-blue w-100 btn-lg btn-big">Đăng nhập</Button> */}
                                <Button type="submit" className="btn-blue col btn-lg btn-big">
                                    {
                                        isLoading === true ? <CircularProgress /> : 'Đăng nhập'
                                    }
                                </Button>
                            </div>
                            <div className="col pr-0">
                                <Link to="/" onClick={() => context.setIsHeaderFooterShow(true)}><Button className="btn-lg btn-big w-100 ml-3" variant="outlined">Hủy</Button></Link>
                                {/* <Link to="/"> <Button className="btn-lg btn-big col ml-3"  variant="outlined" onClick={()=>context.setisHeaderFooterShow(true)}>Hủy</Button></Link> */}
                            </div>
                        </div>


                        {/* sign up */}
                        <p className="txt">Bạn chưa đăng ký? <Link to="/signUp" className="border-effect">Đăng ký ngay</Link></p>


                        {/* sign in by social accounts */}
                        <h6 className="mt-4 text-center font-weight-bold">Bạn có thể đăng nhập bằng tài khoản mạng xã hội</h6>
                        <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} alt='google' /> Đăng nhập với Google</Button>

                    </form>



                </div>

            </div>
        </section>
    )
}

export default SignIn;
