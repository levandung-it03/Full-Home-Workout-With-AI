import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "~/redux/slices/toastSlice";
import { EnumUserService } from "~/services/enumService";
import './Oauth2RedirectPage.scss';
import { checkIsBlank } from "~/utils/formatters";
import { AuthPublicThunk } from "~/redux/thunks/authThunk";

const DEFAULT_OAUTH2_GG_PASS = process.env.REACT_APP_API_DEFAULT_OAUTH2_GG_PASS;
// const DEFAULT_OAUTH2_FB_PASS = process.env.REACT_APP_API_DEFAULT_OAUTH2_FB_PASS;

function Oauth2RedirectPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [genders, setGenders] = useState([]);
    const [isNewUser, setIsNewUser] = useState(false);
    const [formDataForNewUser, setFormData] = useState({});

    //--Configuration
    const onChange = useCallback((e, name) => setFormData(prev => ({ ...prev, [name]: e.target.value })), [setFormData]);
    const noticeAndRedirect = useCallback((response) => {
        if (response.httpStatusCode === 200 || response.status === 200) {
            navigate('/');
            dispatch(addToast(response.data.message, 'success'));
        } else {
            dispatch(addToast(response.data.message, 'error'));
        }
    }, [dispatch, navigate]);
    const reachErrorAndRedirect = useCallback(() => {
        dispatch(addToast("Something wrong when Authorising User!", 'error'));
        navigate("/login");
    }, [dispatch, navigate]);

    //--Initializatione: 
    useEffect(() => {
        const fullUrl = window.location.href;
        window.history.replaceState(null, "", window.location.pathname);
        const codeAt = fullUrl.indexOf("code=");
        const code = fullUrl.slice(codeAt + 5, fullUrl.indexOf("&", codeAt)).trim();

        dispatch(AuthPublicThunk.oauth2AuthorisingThunk({ code, loginType: DEFAULT_OAUTH2_GG_PASS }))
            .then(result => {
                if (result.meta.requestStatus === 'fulfilled') {
                    if (checkIsBlank(result.payload.data) || checkIsBlank(result.payload.data["isExistingUserInfo"]))
                        reachErrorAndRedirect();
                    else if ("" + result.payload.data["isExistingUserInfo"] === "true")
                        noticeAndRedirect(result.payload);
                    else
                        EnumUserService
                            .getAllGendersEnum()
                            .then(genderResponse => {
                                setFormData(prev => ({ ...prev, ...result.payload.data }));
                                setGenders(genderResponse.data);
                                setIsNewUser(true);
                            })
                            .catch(error => { throw error; });
                } else {
                    console.log(result.payload.message);
                    reachErrorAndRedirect();
                }
            });
    }, [noticeAndRedirect, setIsNewUser, setFormData, setGenders, dispatch, navigate, reachErrorAndRedirect]);

    //--New User submittion
    const createNewUser = useCallback(() => {
        if (!formDataForNewUser["genderId"] || !formDataForNewUser["dob"])
            dispatch(addToast("Information is missing", 'error'));
        else
            dispatch(AuthPublicThunk.oauth2RegisterUserThunk({
                firstName: formDataForNewUser["given_name"],
                lastName: formDataForNewUser["family_name"],
                dob: formDataForNewUser.dob,
                genderId: formDataForNewUser.genderId,
                email: formDataForNewUser["email"],
                password: DEFAULT_OAUTH2_GG_PASS,
                otpCode: formDataForNewUser["otpRegisterCode"]
            }))
            .then(result => noticeAndRedirect(result.payload));
    }, [formDataForNewUser, noticeAndRedirect, dispatch]);

    return (
        <div className="oauth2-redirect">
            {(isNewUser && genders)
                ? <form className="oauth2-register-form">
                    <title>We need more information!</title>
                    <fieldset>
                        <legend>Date of Birth</legend>
                        <input className="oauth2-rgt-form-item" name="dob" type="date" onChange={e => onChange(e, "dob")} />
                    </fieldset>
                    <fieldset>
                        <legend>Gender</legend>
                        <select className="oauth2-rgt-form-item" name="genderId" onChange={e => onChange(e, "genderId")} defaultValue="">
                            <option value="" disabled>--Choose gender--</option>
                            {genders.map((genderPair, ind) => <option key={"oauth2-rgs-gend-" + ind} value={genderPair.id}>{genderPair.raw}</option>)}
                        </select>
                    </fieldset>
                    <span onClick={createNewUser}>Submit</span>
                </form>
                : <h1 className="redirect-instruction">Redirecting to Authorization Server...</h1>}
        </div>
    );
}

export default Oauth2RedirectPage;