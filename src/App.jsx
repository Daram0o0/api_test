import { useEffect, useState } from "react";
import { getSurveyList } from "./testAPI";

function App() {
  const [surveys, setSurveys] = useState([]);
// test
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSurveyList(name);
      if (data) {
        setSurveys(data.items);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontSize: "32px",
      }}
    >
      <h1>{"설문조사 현황판"}</h1>
      {surveys.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                제목
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "right",
                }}
              >
                응답 수
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, idx) => (
              <tr key={survey.form_id}>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {idx + 1}
                  {" : "}
                  {survey.title}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {survey.collection.responses_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading surveys...</p>
      )}
    </div>
  );
}

export default App;
