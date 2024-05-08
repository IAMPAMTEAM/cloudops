import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
function UserTest() {
    const [tableData, settableData] = useState([]);
    const [onclickRowData, setOnclickRowData] = useState([]);
    function getOnclickRowData(data) {
        setOnclickRowData(data);
        console.log(data);
    }
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_users-saas.json')
            .then((result) => result.json())
            .then((data) => {
            settableData(data);
        });
    }, []);
    const tableOption = {};
    return _jsx("div", { children: "sad" });
}
export default UserTest;
