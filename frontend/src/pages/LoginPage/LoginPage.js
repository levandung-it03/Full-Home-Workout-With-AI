import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from '~/components';
import { useDispatch } from 'react-redux';
import { addToast } from '~/redux/slices/toastSlice';
import './LoginPage.scss';
import { isEmail, isRequired } from '~/utils/validators';
import { AuthPublicThunk } from '~/redux/thunks/authThunk';
import { trimWords } from '~/utils/formatters';
import { Oauth2PublicService } from '~/services/oauth2Service';

const DEFAULT_OAUTH2_GG_PASS = process.env.REACT_APP_API_DEFAULT_OAUTH2_GG_PASS;
// const DEFAULT_OAUTH2_FB_PASS = process.env.REACT_APP_API_DEFAULT_OAUTH2_FB_PASS;

function LoginPage() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handle logic
    const handleLogin = async (formData) => {
        dispatch(AuthPublicThunk.loginThunk(formData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/');
                dispatch(addToast(result.payload.message, 'success'));
            } else {
                dispatch(addToast(result.payload.message, 'error'));
            }
        });
    };
    
    const oauth2GGLogin = useCallback((e) => {
        async function request() {
            const oauth2Url = await Oauth2PublicService.oauth2Login(DEFAULT_OAUTH2_GG_PASS);
            window.location.href = oauth2Url;
        }
        request();
    }, []);

    return (
        <div className="login-container center">
            <div className="login-background"></div>
            <div className="login-form">
                <div className={'login-title'}>Login</div>
                <Form
                    onSubmit={handleLogin}
                >
                    <Input
                        name="email"
                        label="Email"
                        validators={{
                            isRequired,
                            isEmail,
                        }}
                        formatters={{
                            onChange: [trimWords],
                        }}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        iconSupport={{
                            icon: showPassword ? <EyeOff /> : <Eye />,
                            handleIconClick: () => setShowPassword(!showPassword),
                        }}
                        validators={{
                            isRequired,
                        }}
                    />
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register center">
                        Don't have an account yet?
                        <Link to="/register">Register</Link>
                    </div>
                </Form>
                <div className="oauth2-btns">
                    <div className="divider-container center">
                        <div className="divider-line"></div>
                        <span className="divider-text"> or login with </span>
                        <div className="divider-line"></div>
                    </div>
                    <div className="login-social">
                        <button className="google-btn center" onClick={oauth2GGLogin}>
                            <img src="https://img.icons8.com/color/40/google-logo.png" alt="google-logo" />
                            <span>Login with google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
