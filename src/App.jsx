import React, { useState, useEffect } from 'react';
import { getSurveyList } from './testAPI';
import surveyIds from './data/idRequestList.json';
import { styles } from './styles';

function SurveyList() {
  const [surveys, setSurveys] = useState();

  useEffect(() => {
    const fetchAllSurveys = async () => {
      const allSurveys = [];

      for (let i = 0; i < surveyIds.length; i ++) {
        const batch = surveyIds.slice(i, i + 1);

        const promises = batch.map(async (item) => {
          const data = await getSurveyList({ form_id: item.id });
          if (data) {
            allSurveys.push({ type: item.type, data });
          }
        });

        await Promise.allSettled(promises);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setSurveys(allSurveys);
    };

    fetchAllSurveys();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1>{"2024 한국영상대학교 설문조사 현황판"}</h1>
      <div style={styles.grid}>
        <div style={styles.header}>#</div>
        <div style={styles.header}>Type</div>
        <div style={styles.header}>Total Items</div>
        {surveys? surveys.map((survey, index) => (
          <React.Fragment key={index}>
            <div style={styles.cell}>{index + 1}</div>
            <div style={styles.cell}>{survey.type}</div>
            <div style={styles.cell}>{survey.data.total_items}</div>
          </React.Fragment>
        )) : <div className='loadingText'>{"Loading..."}</div>}
      </div>
    </div>
  );
}

export default SurveyList;
