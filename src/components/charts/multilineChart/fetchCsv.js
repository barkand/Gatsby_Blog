const FetchCsv = async (data) => {
  var jsonData = [];
  let columns = Object.keys(data[0]);

  for (let j = 1; j < columns.length; j++) {
    jsonData.push({
      name: columns[j],
      values: [],
    });
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < columns.length; j++) {
      jsonData[j - 1].values.push({
        x: data[i]["id"],
        y: parseFloat(data[i][columns[j]]),
      });
    }
  }

  return jsonData;
};

export default FetchCsv;
