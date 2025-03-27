async function fetchData() {
  
  const url = 'https://car-api2.p.rapidapi.com/api/vin/1GTG6CEN0L1139305';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f6f1ef6ffemsha7e1a9ca857001ap1344aajsn0b4e895a1979',
      'x-rapidapi-host': 'car-api2.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
}

export default fetchData

