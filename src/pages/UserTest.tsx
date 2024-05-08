import { SingleFlowChart } from '@/components/Charts/_partials/SingleFlowChart';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { VerticalBarChart } from '@/components/Charts/_partials/VerticalBarChart';
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { useState, useEffect } from 'react';
import AccordionTabletest from '@/components/DataTables/AccordionTabletest';
import AccordionTable from '@/components/DataTables/AccordionTable';
import AccessPolicyDevopsTable from '@/components/DataTables/AccessPolicyDevopsTable';
import OnclickGetRowDataTable from '@/components/DataTables/OnclickGetRowDataTable';
import DefaultDataTableFitWidth from '@/components/DataTables/DefaultDataTableFitWidth';
import AccessPolicyAppTable from '@/components/DataTables/AccessPolicyAppTable';
import AccessPolicySaaSTable from '@/components/DataTables/AccessPolicySaaSTable';
import AccessPolicyPortalTable from '@/components/DataTables/AccessPolicyPortalTable';

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

  return <div>sad</div>;
}

export default UserTest;
