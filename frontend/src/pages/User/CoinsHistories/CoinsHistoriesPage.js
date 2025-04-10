import { useCallback, useEffect, useState } from 'react';
import './CoinsHistoriesPage.scss';
import { UserInfoUserService } from '~/services/userInfoService';

function CoinsHistoriesPage() {
    const [coinsHistories, setCoinsHistories] = useState([]);

    useEffect(() => {
        UserInfoUserService.getChangingCoinsHistoriesOfUser()
            .then(response => {
                setCoinsHistories(response.data);
            })
    }, []);

    const capitalizeEnum = useCallback((str) => {
        return (str[0] === "D" ? "+ " : "- ") + str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
    });

    return (
        <div className="coins-histories-page">
            <div className="coins-histories-container">
                <h1>Coins Histories (Top 20)</h1>
                {coinsHistories.length === 0
                    ? <div>Loading...</div>
                    : <ul className="histories-list">
                        {coinsHistories.map(history =>
                        (<li key={history["changingCoinsHistoriesId"]}
                            className={`history-item ${history["changingCoinsType"].toLowerCase()}-history`}>
                            <span className="history-item-header">{capitalizeEnum(history["changingCoinsType"])}</span>
                            <span><span className="coin-symbol">{history["changingCoins"]}&#8373;</span></span>
                            <span>{new Date(...history["changingTime"]).toLocaleString()}</span>
                        </li>))}
                    </ul>}
            </div>
        </div>
    );
}
export default CoinsHistoriesPage;