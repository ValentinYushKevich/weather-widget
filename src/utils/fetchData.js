const fetchData = async title => {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${title}&appid=a11318b7b69a8670ac33c8afc1e25b47&units=metric`
  ).then(data => data.json());
  return data;
};

export { fetchData };
