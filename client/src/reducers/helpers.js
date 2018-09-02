const compareKeys = (key) => (a,b) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

export const sortByAttr = (data, key) => {
  let newArray = [...data];
  newArray.sort(compareKeys(key));
  console.log("sorted");
  console.log(newArray);
  return newArray;
}