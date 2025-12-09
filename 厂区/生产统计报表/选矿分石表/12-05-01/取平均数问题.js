
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计';
      return;
    }

    const values = data.map(item => Number(item[column.property]));
    if (!values.every(value => isNaN(value))) {
      const sum = values.reduce((prev, curr) => prev + curr, 0);

      // 按指定列计算平均值
      if (column.property === '平均氧化含铜') {
        const totalCopper = data.reduce((prev, curr) => prev + Number(curr['三期氧化含铜量']), 0);
        sums[index] = (totalCopper / sum * 100).toFixed(2) + '%';
      } else if (column.property === '平均湿重') {
        const totalWetWeight = data.reduce((prev, curr) => prev + Number(curr['合计湿重']), 0);
        sums[index] = (totalWetWeight / sum).toFixed(0);
      } else {
        sums[index] = sum.toFixed(2);
      }
    } else {
      sums[index] = '';
    }
  });

  return sums;
};
