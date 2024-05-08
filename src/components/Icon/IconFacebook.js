import { jsx as _jsx } from "react/jsx-runtime";
const IconFacebook = ({ className, fill = false, duotone = true }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: fill ? 'currentColor' : 'none', stroke: !fill ? 'currentColor' : 'none', strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: className, children: _jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) }));
};
export default IconFacebook;