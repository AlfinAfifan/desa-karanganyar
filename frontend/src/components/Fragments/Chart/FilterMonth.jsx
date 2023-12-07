export const countDataByMonth = (data) => {
  console.log(data);
  const resultByMonth = [];

  for (let month = 1; month <= 12; month++) {
    const filteredData = filterDataByMonth(data, month);
    const dataCount = filteredData.length;

    resultByMonth.push({
      month: month,
      dataCount: dataCount,
      data: filteredData,
    });
  }

  return resultByMonth;
};

const filterDataByMonth = (data, targetMonth) => {
  return data.filter((item) => {
    const monthFromData = new Date(item.tanggal).getMonth() + 1;
    return monthFromData === targetMonth;
  });
};
