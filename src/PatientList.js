import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table } from 'antd';
import Patient from './Patient';


function PatientList() {
  const [patientlist, setPatientList] = useState({
    list: [],
    page: 1,
    totalLength: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const columns = [
    {
      title: 'id',
      dataIndex: 'personID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.personID - b.personID,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'birthDatetime',
      dataIndex: 'birthDatetime',
    },
    {
      title: 'age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'race',
      dataIndex: 'race',
    },
    {
      title: 'ethnicity',
      dataIndex: 'ethnicity',
    },
    {
      title: 'isDeath',
      dataIndex: 'isDeath',
      render: (isDeath) => (
        <span>
           {isDeath ? 'true' : 'false'}
        </span>
      )
    }
  ]

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setPatientList(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          'http://49.50.167.136:9871/api/patient/list',
          {
            params: {
              order_desc: false,
              order_column: 'person_id'
            }
          }
        );
        console.log(response.data)
        setPatientList(
          response.data.patient
        )
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchPatient();
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>

  return <div style={
    {
      width: '70%',
      margin: '0 auto'
    }
  }>
      <Table 
        columns={columns}
        dataSource={patientlist.list}
        rowKey={p => p.personID}
        pagination={{
          position: ['bottomCenter']
        }}
        expandable={{
          expandedRowRender: p => <Patient id={p.personID} />,
          rowExpandable: p => p.personID !== 'Not Expandable',
        }}
      />
    </div>
}

export default PatientList;
