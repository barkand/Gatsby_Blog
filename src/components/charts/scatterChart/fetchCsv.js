import * as d3 from "d3";

const FetchCsv = async (data, isDate) => {
  var jsonData = [];
  let columns = Object.keys(data[0]);

  for (let j = 1; j < columns.length; j++) {
    jsonData.push({
      name: columns[j],
      values: [],
    });
  }

  var parseTime = d3.timeParse("%b %d, %Y");
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < columns.length; j++) {
      jsonData[j - 1].values.push({
        x: isDate ? parseTime(data[i]["id"]) : parseFloat(data[i]["id"]),
        y: parseFloat(data[i][columns[j]]),
      });
    }
  }

  return jsonData;
};

export default FetchCsv;
