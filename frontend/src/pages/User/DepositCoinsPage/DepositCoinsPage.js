import { useCallback, useState } from "react";
import './DepositCoinsPage.scss';
import noImage from '~/assets/no_image.jpg';
import { SePayUserService } from "~/services/sepayService";
import { addToast } from "~/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";

function DepositCoinsPage() {
    const [image, setImage] = useState(noImage);
    const dispatch = useDispatch();
    const [rawAccount, setRawAccount] = useState({});
    const [coinsAmount, setCoinsAmount] = useState(0);

    const generateQRUrl = useCallback((e) => {
        if (coinsAmount >= 1000) {
            SePayUserService.getQRBankingUrlToDepositCoins(coinsAmount)
                .then(response => {
                    if (response.httpStatusCode + "" === "200") {
                        const { data } = response;
                        const { accountTarget, bankName, description } = data;
                        setImage(data.url);
                        setRawAccount(prev => ({ ...prev, accountTarget, bankName, description }));

                        let maxWaitingTime = 0;
                        let intervalId;
                        setTimeout(() => {  //--Default waiting time when user open bank account.
                            intervalId = setInterval(() => {
                                if (maxWaitingTime > 60) {
                                    clearInterval(intervalId);
                                    dispatch("Transaction Session is lengthy so the result will not be noticed directly!", 'warn');
                                } else {
                                    SePayUserService.getDepositStatus(description)
                                        .then(response => {
                                            if (response.httpStatusCode === 200 && response.applicationCode === 30002) {
                                                dispatch(addToast(response.message, 'success'));
                                                clearInterval(intervalId);
                                            } else if (response.httpStatusCode === 400) {
                                                dispatch(addToast(response.message, 'error'));
                                                clearInterval(intervalId);
                                            }
                                        });
                                }
                                maxWaitingTime += 5;
                            }, 7 * 1000);
                        }, 10 * 1000);
                    } else {
                        dispatch(addToast("Something wrong when Creating QR Url, please don't use it right now", 'error'));
                    }
                });
        }
    }, [coinsAmount, dispatch]);

    const resetStates = useCallback(e => {
        setImage(noImage);
        setRawAccount({});
    }, []);

    return <div className="deposit-coins-page">
        {Object.keys(rawAccount).length === 0
            ? (<div className="qr-preparation-container">
                <form onSubmit={e => e.preventDefault()}>
                    <h1>Deposit Coins</h1>
                    <fieldset>
                        <legend>How many coins? <span className="curr-symbol">1,000VND</span> = <span className="coin-symbol">1&#8373;</span></legend>
                        <input name="coinsAmount" type="number" min="1000" onChange={e => setCoinsAmount(e.target.value)} />
                    </fieldset>
                    <button onClick={generateQRUrl}>Send Request</button>
                </form>
            </div>)
            : (<div className="qr-banking-container">
                <button className="turn-back" onClick={resetStates}><ArrowLeft /></button>
                <div className="qr-code">
                    <img src={image} />
                </div>
                {Object.keys(rawAccount).length !== 0 && (
                    <div className="bank-account-info">
                        <div className="account-target"><span>Number: </span><b>{rawAccount["accountTarget"]}</b></div>
                        <div className="bank-name"><span>Bank: </span><b>{rawAccount["bankName"]}</b></div>
                        <div className="description"><span>Content: </span><b>{rawAccount["description"]}</b></div>
                    </div>)}
            </div>)}
    </div>;
}

export default DepositCoinsPage;