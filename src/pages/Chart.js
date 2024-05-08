import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
function Chart() {
    const [cardList, setCardList] = useState({
        row1: [],
        row2: [],
    });
    useEffect(() => {
        // JSON 데이터를 가져오는 비동기 함수 (실제 API 호출 또는 로컬 JSON 파일 로드 등)
        async function fetchData() {
            try {
                // JSON 데이터 가져오기 예시 (fetch, axios 등을 사용하여 데이터를 가져올 수 있습니다.)
                const response = await fetch('http://localhost:3001/datas');
                const data = await response.json();
                setCardList(data.cardList);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    return (_jsx("div", { className: "pt-5", children: Object.keys(cardList).map((rowKey, rowIndex) => (_jsx("div", { className: `grid lg:grid-cols-${cardList[rowKey].reduce((acc, card) => acc + card.colSpan, 0)} gap-4 mt-4`, children: cardList[rowKey].map((card, cardIndex) => (_jsx("div", { className: `panel lg:col-span-${card.colSpan} p-4 border rounded`, children: _jsx("h2", { children: card.cardName }) }, cardIndex))) }, rowIndex))) }));
}
export default Chart;
