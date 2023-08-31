import dayjs from 'dayjs';

const dates = [
  {
    start: '2022-11-10 00:00',
    end: '2022-11-10 16:30',
  },
  {
    start: '2022-11-10 20:00',
    end: '2022-11-11 10:30',
  },
  {
    start: '2022-11-11 14:30',
    end: '2022-11-12 18:30',
  },
  {
    start: '2022-11-13 00:30',
    end: '2022-11-15 18:30',
  },
];

const groupFun = items => {
  const result = items.reduce((res, item) => {
    const key = dayjs(item.tripStart).format('YYYY-MM-DD');
    res[key] = res[key] || [];
    res[key].push(item);
    return res;
  }, {});
  // console.log(Object.values(result), 'result');
  // console.log(result, 'result');
  return Object.values(result);
};

export const getAllDates = () => {
  let dateArray = [];
  for (let i = 0; i < dates.length; i++) {
    const element = dates[i];
    const result = getDatesFun(element.start, element.end);
    dateArray = [...dateArray, ...result];
  }
  console.log(dateArray, 'dateArray');
  const arrayOfDate = groupFun(dateArray);
  return arrayOfDate;
};

const getDatesFun = (start, end) => {
  const dateArray = [];
  let startDate = dayjs(start).format('YYYY-MM-DD') + ' 00:00';
  let endDate = dayjs(end).format('YYYY-MM-DD') + ' 00:00';
  let startTime = dayjs(start).format('HH:mm');
  let endTime = dayjs(end).format('HH:mm');
  let i = 0;
  let _startDate = dayjs(startDate).format('YYYY-MM-DD');
  let _endDate = dayjs(endDate).format('YYYY-MM-DD');
  let length = dayjs(_endDate).diff(_startDate, 'day');

  console.log(dayjs(startDate) <= dayjs(endDate));

  while (dayjs(startDate) <= dayjs(endDate)) {
    let currentDate = dayjs(startDate).format('YYYY-MM-DD');
    let stopDate = dayjs(endDate).format('YYYY-MM-DD');
    const comp = {
      tripStart:
        currentDate === stopDate
          ? i === 0
            ? `${currentDate} ${startTime}`
            : `${currentDate} 00:00`
          : i === 0
          ? `${currentDate} ${startTime}`
          : `${currentDate} 00:00`,
      tripEnd:
        currentDate === stopDate
          ? i !== length
            ? `${currentDate} 00:00`
            : `${currentDate} ${endTime}`
          : i !== length
          ? `${currentDate}  00:00`
          : `${currentDate} ${endTime}`,
    };

    dateArray.push(comp);
    const addedDay = dayjs(startDate).add(1, 'day');
    startDate = dayjs(addedDay).format('YYYY-MM-DD') + ' 00:00';
    i += 1;
  }
  return dateArray;
};
