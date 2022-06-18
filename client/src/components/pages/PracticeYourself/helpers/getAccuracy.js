const getAccuracy = (userTypeInfo) => {
  if(userTypeInfo.charsTyped === 0) return 0
  return (((userTypeInfo.charsTyped - userTypeInfo.errors) / userTypeInfo.charsTyped) * 100).toFixed(1)
}

export default getAccuracy