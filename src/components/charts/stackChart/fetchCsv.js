const FetchCsv = async (data) => {
  var jsonData = [];
  let columns = Object.keys(data[0]);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      data[i][columns[j]] = parseFloat(data[i][columns[j]]);

      if (j > 1) {
        data[i][columns[j]] += data[i][columns[j - 1]];
      }
    }
  }

  for (let j = 1; j < columns.length; j++) {
    jsonData.push({
      name: columns[j],
      values: [],
    });
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < columns.length; j++) {
      jsonData[j - 1].values.push({
        x: data[i][columns[0]],
        y0: j === 1 ? 0 : data[i][columns[j - 1]],
        y1: data[i][columns[j]],
      });
    }
  }

  return jsonData;
};

export default FetchCsv;
