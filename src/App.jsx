import React, { useState, useEffect } from "react";
import surveyIds from "./data/idRequestList.json";
import { styles } from "./styles";
import getSurveyList from "./api/testAPI";

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchAllSurveys = async () => {
      const allSurveys = await surveyIds.reduce(async (accPromise, item) => {
        const acc = await accPromise;

        const data = await getSurveyList({ form_id: item.id });
        if (data) {
          acc.push({ type: item.type, data });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return acc;
      }, Promise.resolve([]));

      setSurveys(allSurveys);
    };

    fetchAllSurveys();
  }, []);

  const hasSurveys = surveys.length > 0;

  return (
    <div style={styles.wrapper}>
      <h1>{"2024 한국영상대학교 설문조사 현황판"}</h1>
      <div style={styles.grid}>
        <div style={styles.header}>#</div>
        <div style={styles.header}>Type</div>
        <div style={styles.header}>Total Items</div>
        {hasSurveys ? (
          surveys.map((survey, index) => (
            <React.Fragment key={index}>
              <div style={styles.cell}>{index + 1}</div>
              <div style={styles.cell}>{survey.type}</div>
              <div style={styles.cell}>{survey.data.total_items}</div>
            </React.Fragment>
          ))
        ) : (
          <div className="loadingText">{"Loading..."}</div>
        )}
      </div>
    </div>
  );
}

export default SurveyList;
