import Account from '@/components/Approval/Account';
import Policy from '@/components/Approval/Policy';
import DefaultDataTable from '@/components/DataTables/DefaultDataTable';
import { useEffect, useState } from 'react';

const Approval = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/users-hr')
      .then((result) => result.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6'>
        <div className='panel min-h-[400px]'>
          {
            // @ts-ignore
            <DefaultDataTable tableData={rowData} />
          }
        </div>
        {/* TODO: 임시조건 부여 (추후에 데이터테이블 추가 후 수정 예정) */}
        {isClicked ? <Account /> : <Policy />}
      </div>
    </div>
  );
};

export default Approval;
