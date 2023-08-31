const typeOfValue = {
  string: 'VARCHAR',
  undefined: 'VARCHAR',
  number: 'INTEGER',
};
export const TableValueGenerator = data => {
  return new Promise((resolve, reject) => {
    const toArray = Object.entries(data);
    const joinValues = toArray.map(
      item => `${item[0]} ${typeOfValue[typeof item[1]]}`,
    );
    resolve(joinValues.toString());
  });
};
