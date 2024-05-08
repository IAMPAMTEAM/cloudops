import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import DefaultDataTable from '../DataTables/DefaultDataTableFitWidth';
import IconTrash from '../Icon/IconTrash';
import IconPlus from '../Icon/IconPlus';
import IconRefresh from '../Icon/IconRefresh';
const Policy = ({ formType }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [processData, setProcessData] = useState([]);
    const [accountData, setAccountData] = useState([]);
    const [notesData, setNotesData] = useState([]);
    const [resource, setResource] = useState('');
    const [dataTable, setDataTable] = useState([]);
    useEffect(() => {
        fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/process.json')
            .then((result) => result.json())
            .then((data) => setProcessData(data));
        fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/account.json')
            .then((result) => result.json())
            .then((data) => setAccountData(data));
        fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/notes.json')
            .then((result) => result.json())
            .then((data) => setNotesData(data));
        console.log(formType);
        // setResource(formType);
        // console.log(resource, 'dfasfadsfds');
        if (formType) {
            switch (formType) {
                case 'server':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/server.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'db':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/db.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'vpn':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/vpn.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'app':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/app.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'saas':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/saas.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'aws iam':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/awsIAM.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                case 'portal':
                    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/portal.json')
                        .then((result) => result.json())
                        .then((data) => setDataTable(data));
                    break;
                default:
            }
        }
    }, []);
    return (_jsxs("div", { className: 'grid lg:grid-cols-7 lg:grid-row-10 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-3', children: accountData.map((data, index) => (_jsxs("div", { className: 'space-y-5 p-5', children: [_jsxs("div", { className: 'grid lg:grid-cols-2 gap-4', children: [_jsxs("label", { className: 'input input-bordered flex items-center gap-2', children: ["\uC774\uB984", _jsx("input", { type: 'text', className: 'grow pl-4 font-light', value: data['accoutUsername'] })] }), _jsxs("label", { className: 'input input-bordered flex items-center gap-2', children: ["\uC544\uC774\uB514", _jsx("input", { type: 'text', className: 'grow pl-4 font-light', value: data['accountRequestWho'] })] })] }), _jsxs("label", { className: 'input input-bordered flex items-center gap-2', children: ["\uC720\uD6A8\uC2DC\uD55C", _jsx("input", { type: 'text', className: 'grow pl-4 font-light', value: data['accountRenewalDue'] })] }), _jsxs("label", { className: 'input input-bordered flex items-center gap-2', children: ["\uC794\uC5EC \uC720\uD6A8\uC77C", _jsx("input", { type: 'text', className: 'grow pl-4 font-light', value: data['accountRenewalDate'] })] }), _jsxs("label", { className: 'input input-bordered flex items-center gap-2', children: ["Credential URI", _jsx("input", { type: 'text', className: 'grow pl-4 font-light', value: data['accountCredentialsUri'] })] })] }))) }), _jsxs("div", { className: 'panel lg:col-span-2 overflow-x-auto', children: [_jsx("h2", { className: 'font-semibold mb-5', children: "\uD504\uB85C\uC138\uC2A4 (\uACB0\uC7AC \uC21C\uC11C) " }), _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Name" }), _jsx("th", { children: "Team" })] }) }), _jsx("tbody", { className: 'font-light', children: processData.map((data, index) => (_jsxs("tr", { children: [_jsx("th", { children: data['processType'] === 'agree' ? (_jsx("div", { className: 'badge badge-info gap-2', children: data['processType'] })) : data['processType'] === 'approve' ? (_jsx("div", { className: 'badge badge-success gap-2', children: data['processType'] })) : data['processType'] === 'review' ? (_jsx("div", { className: 'badge badge-warning gap-2', children: data['processType'] })) : (_jsx("div", { className: 'badge badge-error gap-2', children: data['processType'] })) }, index), _jsx("td", { children: data['processUsername'] }), _jsx("td", { children: data['processUsernameTeam'] })] }))) })] })] }), _jsxs("div", { className: 'panel lg:col-span-2', children: [_jsx("h2", { className: 'font-semibold mb-5', children: "Notes" }), _jsx("div", { className: 'overflow-x-auto', children: _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Note" }), _jsx("th", { children: "Register" })] }) }), _jsx("tbody", { children: notesData.map((data, index) => (_jsxs("tr", { children: [_jsx("th", { children: data['processType'] === 'agree' ? (_jsx("div", { className: 'badge badge-info', children: data['processType'] })) : data['processType'] === 'approve' ? (_jsx("div", { className: 'badge badge-success', children: data['processType'] })) : (_jsx("div", { className: 'badge badge-warning', children: data['processType'] })) }), _jsx("td", { children: data['note'] }), _jsx("td", { children: data['processUsername'] })] }, index))) })] }) })] }), _jsxs("div", { className: 'panel lg:col-span-7 lg:row-span-3', children: [_jsxs("div", { className: 'flex place-content-between', children: [_jsxs("button", { className: 'btn mb-4 shadow-none btn-error text-white', children: [_jsx(IconTrash, {}), _jsx("p", { children: "\uC0AD\uC81C" })] }), _jsxs("div", { className: 'flex gap-4', children: [_jsxs("button", { className: 'btn mb-4 shadow-none border-none bg-[#9fa5aa] text-white', children: [_jsx(IconRefresh, {}), _jsx("p", { children: "\uC120\uD0DD \uCD08\uAE30\uD654" })] }), _jsxs("button", { className: 'btn mb-4 shadow-none bg-[#8996d6] border-none text-white', children: [_jsx(IconPlus, {}), _jsx("p", { children: "\uCD94\uAC00" })] })] })] }), _jsx("div", { children: _jsx(DefaultDataTable, { tableData: dataTable, tableOption: {} }) })] })] }));
};
export default Policy;
