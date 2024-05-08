import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TopologyRepeat = (props) => {
    return (_jsx("div", { className: `panel grid lg:grid-cols-2 gap-6`, children: props.imageSrcs.map((imageSrc, idx) => {
            return (_jsxs("div", { className: `panel lg:col-span-1`, children: [props.title && _jsx("h3", { className: " font-semibold text-2xl", children: props.title[idx] }), _jsx("img", { className: "", src: imageSrc, alt: "placeholder" })] }, idx));
        }) }));
};
