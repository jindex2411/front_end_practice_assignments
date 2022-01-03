import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Patient({ id }) {
  const [description, setDescription] = useState({
    visitCount: 0,
    conditionList: [],
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setDescription(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          `http://49.50.167.136:9871/api/patient/brief/${id}`
        );
        console.log(response.data)
        setDescription(
          response.data
        )
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchPatient();
  }, [id]);
  
  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>

  return <div> 
      Visit Count : {description.visitCount}
      <br/>
      Description : {description.conditionList.join(', ')}
    </div>
}

export default Patient;
