import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import { Tab, Tabs, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PasswordBox from '../../Components/PasswordBox';
import { MyContext } from '../../App';


import { uploadImage, fetchDataFromApi, editData } from '../../utils/api';

const MyAccount = () => {
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [inputIndex, setInputIndex] = useState(false);


    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        images: [],
        createdDate: Date.now()
    });

    const [fields, setFields] = useState({
        adminPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    const [value, setValue] = useState(0);
    const context = useContext(MyContext);
    

    useEffect(() => {
        window.scrollTo(0, 0); 
        const token = localStorage.getItem("token"); 
        if (token !== "" && token !== undefined && token !== null) { 
            setIsLogin(true); 
        } else {
            navigate("/signIn"); 
        }

        const user = JSON.parse(localStorage.getItem("user")); 

        if (user) {
            fetchDataFromApi(`/api/user/${user.userId}`).then((res) => {
                setUserData(res);
                setFormFields({
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                    address: res.address,
                    images: res.images[0]
                });
                setPreview(res.images[0]);
            }).catch((error) => {
                console.error("Error fetching user data", error);
            });
        }
    }, [navigate]);


    // tab routes
    useEffect(() => {
        if (location.pathname.includes('change-password')) {
            setValue(1);
        } else {
            setValue(0);
        }
    }, [location.pathname]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate(`/my-account/change-personal-info`);
        } else {
            navigate(`/my-account/change-password`);
        }
    };


    // change user info (without password)
    const changeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value
        }));
    };

    const changeInput2 = (e) => {
        setFields(() => ({
            ...fields,
            [e.target.name]: e.target.value
        }));
    }

    const changePassword = (e) => {
        e.preventDefault();

        console.log("fields.staffPassword: " + fields.adminPassword);
        console.log("fields.password: " + fields.newPassword);
        console.log("fields.confirmPassword: " + fields.confirmPassword);

    
        // Validate form data
        if (fields.adminPassword === "" || fields.newPassword === "" || fields.confirmPassword === "") {
            context.setAlertBox({ open: true, error: true, msg: 'Vui lòng điền đầy đủ thông tin'});
            return;
        }
    
        if (fields.newPassword !== fields.confirmPassword) {
            context.setAlertBox({ open: true, error: true, msg: 'Mật khẩu và xác nhận mật khẩu không khớp' });
            return;
        }
    
        if (fields.adminPassword === fields.newPassword && fields.newPassword === fields.confirmPassword) {
            context.setAlertBox({ open: true, error: true, msg: 'Vui lòng đặt mật khẩu mới khác với mật khẩu hiện tại' });
            return;
        }


        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const data = {
                email: user?.email,
                password: fields.adminPassword,
                newPass: fields.newPassword
            };

            console.log("data to change password:", data.email, ", ", data.password, ", ", data.newPass);
        
            setIsLoading(true);
            editData(`/api/user/changePassword/${user?.userId}`, data)
                .then((res) => {    
                    console.log("******res: " + res);

                    // Xử lý phản hồi từ server
                    if (res?.error) {
                        console.log("unsuccess");
                        // Nếu có lỗi
                        context.setAlertBox({ open: true, error: true, msg: res.msg });
                    } 
                    else if (res?.success || res === 'undefined') {
                        // Nếu thành công
                        console.log("success");
                        context.setAlertBox({ open: true, error: false, msg: "Tài khoản của bạn đã được cập nhật" });
                        setTimeout(() => {
                            setIsLoading(false);
                            navigate("/");
                            context.setAlertBox({ open: false });
                        }, 2000);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Lỗi khi thay đổi mật khẩu:', error);
                    context.setAlertBox({ open: true, error: true, msg: error.response?.data?.msg || 'Đã xảy ra lỗi khi thay đổi mật khẩu' });
                });
        } 
        catch (error) {
            setIsLoading(false);
            console.error('Lỗi khi thay đổi mật khẩu:', error);
            context.setAlertBox({ open: true, error: true, msg: 'Đã xảy ra lỗi khi thay đổi mật khẩu' });
        }
        setIsLoading(false);
    };

    const handleTogglePassword = (type) => {
        if (type === 'password') {
            setIsShowPassword(prev => !prev);
            setIsShowConfirmPassword(false);
        } else if (type === 'confirmPassword') {
            setIsShowConfirmPassword(prev => !prev);
            setIsShowPassword(false);
        }
    };

    const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));
            previewFiles(file);
        } else {
            setFormFields(prevFields => ({
                ...prevFields,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formFields.name || !formFields.phone || !formFields.address) {
            context.setAlertBox({ open: true, error: true, msg: "Vui lòng điền đầy đủ các trường bắt buộc." });
            return;
        }
    
        setIsLoading(true);
    
        try {
            // Upload image first
            let imageUrl = '';
            console.log("file: " + file);
            if (file) {
                // const result = await axios.post("http://localhost:4000/api/uploadImage", { image });
                const result = await uploadImage('/api/uploadImage', { image });
                imageUrl = result.secure_url;
                console.log(imageUrl);
                
            }
            
    
            // Prepare form data with image URLs
            const formDataWithImages = { ...formFields, images: imageUrl ? [imageUrl] : formFields.images };
    
            if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "" && formFields.address !== "") {   //nếu các thông tin đều hợp lệ                                                                //Đặt trạng thái isLoading thành true để hiển thị trạng thái đang tải
                const user = JSON.parse(localStorage.getItem("user"));                                          //Lấy thông tin user từ localStorage và gửi yêu cầu cập nhật dữ liệu user qua API bằng hàm editData
                setIsLoading(true);
                editData(`/api/user/${user?.userId}`, formDataWithImages)
                    .then((res) => {
                        // update localStorage:
                        const updatedUser = {
                            ...user,
                            name: formFields.name,
                            userImage: formFields.images
                        }
                        localStorage.setItem("user", JSON.stringify(updatedUser));

                        // 
                        setTimeout(() => {
                            context.setAlertBox({ open: false, error: false, msg: "Tài khoản của bạn đã được cập nhật" }); 
                            setIsLoading(false);
                        }, 2000 );
                    });                                                          
            }
            else {
                context.setAlertBox({ open: true,
                                    error: true,
                                    msg: 'Vui lòng điền đầy đủ thông tin'
                                    });
                return false;
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };

    const removeImg = () => {
        setPreview('');
        setFile(null);
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        } else {
            console.error("File input element not found.");
        }
    };
    

    return (
        <section className='content section myAccountPage'>
            <div className='container-fluid'>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleTabChange}>
                        <Tab label="Thông tin cá nhân" component={Link} to={`/my-account/change-personal-info`}/>
                        <Tab label="Đổi mật khẩu" component={Link} to={`/my-account/change-password`}/>
                    </Tabs>
                </Box>

                <Routes>
                    <Route path="change-personal-info" element={
                        <CustomTabPanel value={value} index={0}>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-4 img-container card shadow border-0 p-3 px-4 py-4'>
                                        <div className='imgUploadBox d-flex align-items-center'>
                                            <div className='uploadBox w-100 d-flex align-items-center justify-content-center' onClick={handleImageClick}>
                                                {preview ? (
                                                    <div className='box d-flex align-items-center justify-content-center'>
                                                        <img alt="preview" effect="blur" className="w-100" src={preview} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {isLoading ? (
                                                            <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column">
                                                                <CircularProgress />
                                                                <span>Đang tải...</span>
                                                            </div>
                                                        ) : (
                                                            <div className='info'>
                                                                <h5>Tải ảnh lên</h5>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                {/* {preview && (
                                                    <span className="remove" onClick={removeImg}>
                                                        <CiCircleRemove />
                                                    </span>
                                                )} */}
                                                {isLoading || (
                                                    <input type="file" id="file-input" onChange={handleChange} name="image" accept="image/png, image/jpeg, image/jpg, image/jfif" style={{ display: 'none' }} />
                                                )}
                                            </div>
                                        </div>
                                        <br/> <br/>
                                        <div onClick={handleImageClick} className='text-center image-note'>bấm vào ô để tải ảnh</div>
                                    </div>

                                    <div className='col-md-8 card shadow border-0 p-4 px-4'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <TextField label="Tên" variant="outlined" className='w-100' name="name" onChange={changeInput} value={formFields.name} />
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <TextField label="Email" variant="outlined" className='w-100' name="email" value={formFields.email} disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <TextField label="Số điện thoại" variant="outlined" className='w-100' name="phone" onChange={changeInput} value={formFields.phone} />
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <TextField label="Địa chỉ" variant="outlined" className='w-100' name="address" onChange={changeInput} value={formFields.address} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <Button variant="contained" className='btn bg-primary' type="submit">
                                                {isLoading ? (
                                                    <CircularProgress className='text-light' />
                                                ) : (
                                                    "Lưu"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CustomTabPanel>
                    }/>

                    <Route path="change-password" element={
                        <CustomTabPanel value={value} index={1}>
                            <form onSubmit={changePassword} className='justify-content-center'>
                                {/* card shadow border-0 p-4 px-4 */}
                                <div className='card shadow border-0 p-4'>
                                    <div className='row gx-3'>
                                        <div className='col-md-4 col-sm-12 mb-3'>
                                            <PasswordBox
                                                label="Mật khẩu hiện tại"
                                                name="adminPassword"
                                                inputIndex={0}
                                                setInputIndex={setInputIndex}
                                                changeInput2={changeInput2}
                                            />
                                        </div>

                                        <div className='col-md-4 col-sm-12 mb-3'>
                                            <PasswordBox
                                                label="Mật khẩu mới"
                                                name="newPassword"
                                                inputIndex={1}
                                                setInputIndex={setInputIndex}
                                                changeInput2={changeInput2}
                                            />
                                        </div>

                                        <div className='col-md-4 col-sm-12 mb-3'>
                                            <PasswordBox
                                                label="Xác nhận mật khẩu mới"
                                                name="confirmPassword"
                                                inputIndex={2}
                                                setInputIndex={setInputIndex}
                                                changeInput2={changeInput2}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group d-flex justify-content-center'>
                                        <Button variant="contained" className='btn bg-primary btn-lg' type="submit">
                                            {isLoading ? (
                                                <CircularProgress className='text-light' />
                                            ) : (
                                                "Lưu"
                                            )}
                                        </Button>
                                    </div>
                                </div>

                            </form>
                        </CustomTabPanel>
                        
                    }/>

                </Routes>
            </div>
        </section>
    );
};



const CustomTabPanel = ({ children, value, index, ...other }) => {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default MyAccount;
