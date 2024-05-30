import { useRef, useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './SeucurityGroup.css';

interface SgInboundUri {
  sgName: string;
  sgId: string;
  protocolType: string;
  protocol: string;
  portRange: number;
  source: string;
}

interface SgOutboundUri {
  sgName: string;
  sgId: string;
  protocolType: string;
  protocol: string;
  portRange: number;
  destination: string;
}

interface SgAssociationUri {
  [index: string]: string;
}

interface RowData {
  formCategory: string;
  formRequestWho: string;
  formRequestWhat: string;
  sgAwsAccount: number;
  sgAwsRegion: string;
  sgAwsVpc: string;
  sgName: string;
  sgId: string;
  sgInboundUri: SgInboundUri[];
  sgOutboundUri: SgOutboundUri[];
  sgAssociationsUri: SgAssociationUri[];
}

type ColumnDefsType = { filter: string; cellClassRules?: { string: () => boolean } }[];

const defaultTableConfig = {
  tableHeight: 325,
  pagination: true,
  paginationPageSize: 5,
  paginationPageSizeSelector: [10, 20, 50, 100],
};

const defaultColDef = {
  filter: true,
};

const autoSizeStrategy = {
  type: 'fitCellContents',
} as SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy;

const SecurityGroup = () => {
  const gridRef = useRef<AgGridReact>(null);
  const gridAssociationsRef = useRef<AgGridReact>(null);
  const gridInboundRef = useRef<AgGridReact>(null);
  const gridOutboundRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowData[]>();
  const [associationsRowData, setAssociationsRowData] = useState<SgAssociationUri[]>();
  const [associationsColumnDefs, setAssociationsColumnDefs] = useState<{ [index: string]: string }[]>();
  const [inboundRowData, setInboundRowData] = useState<SgInboundUri[]>();
  const [inboundColumnDefs, setInboundColumnDefs] = useState<{ filter: string; cellClassRules?: { string: () => boolean } }[]>();
  const [outboundRowData, setOutboundRowData] = useState<SgOutboundUri[]>();
  const [outboundColumnDefs, setOutboundColumnDefs] = useState<{ filter: string; cellClassRules?: { string: () => boolean } }[]>();
  const [currentRowData, setCurrentRowData] = useState<RowData>();
  const [columnDefs, setColumnDefs] = useState<{ [index: string]: string }[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://ub-sg-demodata.s3.ap-northeast-2.amazonaws.com/sgTransform.json');
      const data = (await res.json()) as RowData[];
      const [firstData] = data;

      setRowData(data);
      setCurrentRowData(firstData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(rowData) && rowData.length) {
      const [firstRowData] = rowData;

      const keys = Object.keys(firstRowData);
      const columns = keys
        .map((key) => {
          if (key === 'sgAwsAccount' || key === 'sgAwsRegion' || key === 'sgAwsVpc' || key === 'sgName' || key === 'sgId') {
            return { field: key };
          }

          return;
        })
        .filter((v) => v) as { [index: string]: string }[];

      setColumnDefs(columns);
      setRowData(rowData);
    }
  }, [rowData]);

  useEffect(() => {
    if (!currentRowData) {
      return;
    }

    const { sgAssociationsUri, sgInboundUri, sgOutboundUri } = currentRowData;
    const [associationsFirstRowData] = sgAssociationsUri;
    const [inboundFirstRowData] = sgInboundUri;
    const [outboundFirstRowData] = sgOutboundUri;

    if (associationsFirstRowData) {
      const associationsColumns = [{ field: 'type' }, { field: 'resource' }, { field: 'tag' }];

      const somedAssociationsUri = sgAssociationsUri.some((association) => {
        return Object.keys(association).length >= 3;
      });

      const filteredSgAssociationsUri = sgAssociationsUri.map((association) => {
        if (association['sgAssociatedELB']) {
          const mapedAssociation = association['sgAssociatedELB'].split(', ').map((elb: string) => {
            return {
              type: 'ELB',
              resource: elb,
              tag: '-',
            };
          });

          return mapedAssociation;
        } else if (association['sgAssociatedEC2']) {
          const mapedAssociation = association['sgAssociatedEC2'].split(', ').map((ec2: string) => {
            return {
              type: 'EC2',
              resource: ec2,
              tag: '-',
            };
          });

          return mapedAssociation;
        } else if (association['sgAssociatedRDS']) {
          const mapedAssociation = association['sgAssociatedRDS'].split(', ').map((rds: string) => {
            return {
              type: 'RDS',
              resource: rds,
              tag: '-',
            };
          });

          return mapedAssociation;
        }
      });

      const flatedSgAssociationsUri = filteredSgAssociationsUri.flat() as {
        type: string;
        resource: string;
        tag: string;
      }[];

      setAssociationsColumnDefs(associationsColumns);

      setAssociationsRowData(somedAssociationsUri ? flatedSgAssociationsUri : []);
    } else {
      setAssociationsColumnDefs([]);
      setAssociationsRowData([]);
    }

    if (inboundFirstRowData) {
      const inboundColumns = Object.keys(inboundFirstRowData)
        .map((key) => {
          if (key !== 'sgName' && key !== 'sgId') {
            if (key === 'portRange' || key === 'source') {
              return {
                field: key,
                cellClassRules: {
                  'bg-[#d8ebfd]': () => true,
                },
              };
            }

            return {
              field: key,
            };
          }
        })
        .filter((v) => v) as unknown as ColumnDefsType;

      setInboundColumnDefs(inboundColumns);
      setInboundRowData(sgInboundUri);
    } else {
      setInboundColumnDefs([]);
      setInboundRowData([]);
    }

    if (outboundFirstRowData) {
      const outboundColumns = Object.keys(outboundFirstRowData)
        .map((key) => {
          if (key !== 'sgName' && key !== 'sgId') {
            if (key === 'portRange' || key === 'destination') {
              return {
                field: key,
                cellClassRules: {
                  'bg-[#d8ebfd]': () => true,
                },
              };
            }

            return {
              field: key,
            };
          }
        })
        .filter((v) => v) as unknown as ColumnDefsType;

      setOutboundColumnDefs(outboundColumns);
      setOutboundRowData(sgOutboundUri);
    } else {
      setOutboundColumnDefs([]);
      setOutboundRowData([]);
    }
  }, [currentRowData]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef || !gridRef.current) {
      return;
    }

    const [selectedRowData] = gridRef.current.api.getSelectedRows();

    setCurrentRowData(selectedRowData);
  }, []);

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-6'>
          <div className='w-[60%]'>
            <p className='text-lg pb-4 '>Security Group</p>
            <div className='ag-theme-alpine' style={{ height: defaultTableConfig.tableHeight }}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                autoSizeStrategy={autoSizeStrategy}
                pagination={defaultTableConfig.pagination}
                paginationPageSize={defaultTableConfig.paginationPageSize}
                paginationPageSizeSelector={defaultTableConfig.paginationPageSizeSelector}
                onSelectionChanged={onSelectionChanged}
                rowSelection={'single'}
              />
            </div>
          </div>
          {currentRowData && (
            <div className='w-[40%]'>
              <p className='text-lg pb-4'>Associations</p>
              <div className='ag-theme-alpine' style={{ height: defaultTableConfig.tableHeight }}>
                <AgGridReact
                  ref={gridAssociationsRef}
                  rowData={associationsRowData}
                  columnDefs={associationsColumnDefs}
                  defaultColDef={defaultColDef}
                  autoSizeStrategy={autoSizeStrategy}
                  pagination={defaultTableConfig.pagination}
                  paginationPageSize={defaultTableConfig.paginationPageSize}
                  paginationPageSizeSelector={defaultTableConfig.paginationPageSizeSelector}
                  rowSelection={'single'}
                />
              </div>
            </div>
          )}
        </div>
        <div className='flex gap-6'>
          {currentRowData && (
            <>
              <div className='w-[50%]'>
                <p className='text-lg pb-4'>InBound</p>
                <div className='ag-theme-alpine' style={{ height: defaultTableConfig.tableHeight }}>
                  <AgGridReact
                    ref={gridInboundRef}
                    rowData={inboundRowData}
                    columnDefs={inboundColumnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    pagination={defaultTableConfig.pagination}
                    paginationPageSize={defaultTableConfig.paginationPageSize}
                    paginationPageSizeSelector={defaultTableConfig.paginationPageSizeSelector}
                    rowSelection={'single'}
                  />
                </div>
              </div>
              <div className='w-[50%]'>
                <p className='text-lg pb-4'>OutBound</p>
                <div className='ag-theme-alpine' style={{ height: defaultTableConfig.tableHeight }}>
                  <AgGridReact
                    ref={gridOutboundRef}
                    rowData={outboundRowData}
                    columnDefs={outboundColumnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    pagination={defaultTableConfig.pagination}
                    paginationPageSize={defaultTableConfig.paginationPageSize}
                    paginationPageSizeSelector={defaultTableConfig.paginationPageSizeSelector}
                    rowSelection={'single'}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SecurityGroup;
