// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), 
// возвращающей промис с массивом стран, результат запроса к API. // fetchCountries(searchQuery)
// api адресс сервера
const BASIC_URL='https://restcountries.com/v3.1';
// запрос на сервер
const fetchCountries = searchQuery => { 
    return fetch (`${BASIC_URL}/name/${searchQuery}`)
    .then(Response=>Response.json())
}
export default {fetchCountries};


