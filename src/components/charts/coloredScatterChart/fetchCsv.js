import * as d3 from "d3";

const FetchCsv = async (data, isDate) => {
  var jsonData = [];
  let columns = Object.keys(data[0]);

  jsonData.push({
    name: columns[1],
    values: [],
  });

  var parseTime = d3.timeParse("%b %d, %Y");

  for (let i = 0; i < data.length; i++) {
    jsonData[0].values.push({
      x: isDate
        ? parseTime(data[i][columns[0]])
        : parseFloat(data[i][columns[0]]),
      y: parseFloat(data[i][columns[1]]),
      c: parseFloat(data[i][columns[2]]),
    });
  }

  return jsonData;
};

export default FetchCsv;
