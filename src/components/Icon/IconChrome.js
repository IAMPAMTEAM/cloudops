import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const IconChrome = ({ className, fill = false, duotone = true }) => {
    return (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: className, children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("circle", { opacity: duotone ? '0.5' : '1', cx: "12", cy: "12", r: "4" }), _jsx("line", { opacity: duotone ? '0.5' : '1', x1: "21.17", y1: "8", x2: "12", y2: "8" }), _jsx("line", { opacity: duotone ? '0.5' : '1', x1: "3.95", y1: "6.06", x2: "8.54", y2: "14" }), _jsx("line", { opacity: duotone ? '0.5' : '1', x1: "10.88", y1: "21.94", x2: "15.46", y2: "14" })] }));
};
export default IconChrome;
