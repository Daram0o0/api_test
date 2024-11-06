import React, { useState, useEffect } from 'react';
import { getSurveyList } from './testAPI';
import surveyIds from './data/idRequestList.json';
import { styles } from './styles';

function SurveyList() {
  const [surveys, setSurveys] = useState();

  useEffect(() => {
    const fetchAllSurveys = async () => {
      const allSurveys = [];
      let total = 0;

      for (let i = 0; i < surveyIds.length; i += 2) {
        const batch = surveyIds.slice(i, i + 2);

        const promises = batch.map(async (item) => {
          const data = await getSurveyList({ form_id: item.id });
          if (data) {
            allSurveys.push({ type: item.type, data });
          }
        });

        await Promise.all(promises);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }

      setSurveys(allSurveys);
    };

    fetchAllSurveys();
  }, []);

  console.log(surveys)

  return (
    <div style={styles.wrapper}>
      <h1>{"2024 한국영상대학교 현황판"}</h1>
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
