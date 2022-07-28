const getAccuracy = (charsTyped, errors) => {
  if (charsTyped === 0) return 0;
  return (((charsTyped - errors) / charsTyped) * 100).toFixed(1);
};

export default getAccuracy;
