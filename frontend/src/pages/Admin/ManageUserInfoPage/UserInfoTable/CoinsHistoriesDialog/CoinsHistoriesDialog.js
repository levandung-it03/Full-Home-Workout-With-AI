import { useSelector } from 'react-redux';
import './CoinsHistoriesDialog.scss';
import { SubscriptionAdminThunk } from '~/redux/thunks/subscriptionThunk';
import Pagination from '~/components/ui/Table/Pagination/Pagination';
import { addToast } from '~/redux/slices/toastSlice';
import { Table, FormatterDict } from '~/components/ui/Table/CustomTable';
import { useMemo, useState } from 'react';
import { Input, Select } from '~/components';

export default function CoinsHistoriesDialog({ userInfoId }) {
    const changingCoinsState = useSelector((state) => state.changingCoins)
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Dialog")
    const tableComponents = useMemo(() => FormatterDict.TableComponents({
        reduxInfo: {
            GET_thunk: {
                moreParams: { id: userInfoId },
                thunk: SubscriptionAdminThunk.getAllCoinsHistoriesByUserInfoThunk
            }
        },
        tableInfo: {
            columnsInfo: [
                FormatterDict.ColumnInfo("changingCoinsHistoriesId", "Id"),
                FormatterDict.ColumnInfo("fullName", "Full Name"),
                FormatterDict.ColumnInfo("changingCoinsType", "Type"),
                FormatterDict.ColumnInfo("changingTime", "Time"),
                FormatterDict.ColumnInfo("changingCoins", "Coins"),
            ],
            filterFields: [
                FormatterDict.FilterField("Id", <Input name="changingCoinsHistoriesId" />),
                FormatterDict.FilterField("Full Name", <Input name="fullName" />),
                FormatterDict.FilterField("changingCoinsType", <Select name="changingCoinsType" options={[
                    { value: "DEPOSIT", text: "Deposit" },
                    { value: "USING", text: "Using" },
                ]} />),
                FormatterDict.FilterField("Changing Time", <Input type="datetime-local" name="changingTime" />),
                FormatterDict.FilterField("Coins", <Input type="number" name="changingCoins" />),
            ],
            sortingFields: [
                FormatterDict.SortingField("changingCoinsHistoriesId", "Id"),
                FormatterDict.SortingField("fullName", "Full Name"),
                FormatterDict.SortingField("changingCoinsType", "Type"),
                FormatterDict.SortingField("changingTime", "Time"),
                FormatterDict.SortingField("changingCoins", "Coins"),
            ],
        },
        reducers: {
            globalToastEngine: addToast
        }
    }), []);

    return (
        <>
            <Table
                title="Coins Histories"
                tableState={changingCoinsState}
                pageState={currentPage}
                tableComponents={tableComponents}
                tableModes={FormatterDict.TableModes(false, false, false, false, false)}
            />
            <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={changingCoinsState.totalPages}
            />
        </>
    );
}