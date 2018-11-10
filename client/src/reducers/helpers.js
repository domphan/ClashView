const compareKeysDesc = (key) => (a,b) => {
  if (a[key].toUpperCase() < b[key].toUpperCase()) return -1;
  if (a[key].toUpperCase() > b[key].toUpperCase()) return 1;
  return 0;
};

export const sortByDesc = (data, key) => {
  let newArray = [...data];
  newArray.sort(compareKeysDesc(key));
  console.log("DESC");
  return newArray;
}

const compareKeysAsc = (key) => (a, b) => {
  if (a[key].toUpperCase() > b[key].toUpperCase()) return -1;
  if (a[key].toUpperCase() < b[key].toUpperCase()) return 1;
  return 0;
};

export const sortByAsc = (data, key) => {
  let newArray = [...data];
  newArray.sort(compareKeysAsc(key));
  console.log("ASC");
  return newArray;
}