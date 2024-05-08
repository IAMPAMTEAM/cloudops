import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
const Compliance = () => {
    const [reportHTML, setReportHTML] = useState('');
    useEffect(() => {
        fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/compliance.txt')
            .then(async (response) => await response.text())
            .then((data) => setReportHTML(data));
    });
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const tabs = document.querySelectorAll('.tab');
        const reports = document.querySelectorAll('.h-report');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach((t) => t.classList.remove('tab-active'));
                tab.classList.add('tab-active');
                reports.forEach((t) => t.classList.add('hidden'));
                reports[index]?.classList.remove('hidden');
            });
        });
    });
    return (_jsx("div", { children: _jsx("div", { className: 'grid', children: _jsxs("div", { className: 'panel', children: [_jsx("p", { className: 'font-semibold text-xl pl-4', children: "Compliance" }), _jsx("hr", { className: 'mt-4' }), _jsx("div", { dangerouslySetInnerHTML: { __html: reportHTML } })] }) }) }));
};
export default Compliance;
