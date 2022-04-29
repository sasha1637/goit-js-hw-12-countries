import './sass/main.scss';
import refs from './js/refs.js';
import API from './js/fetchCountries';
import cardCountri from './templates/cardCountri.hbs'
import listSearchCountries from './templates/listSearchCountries.hbs'
import debounce from 'debounce';
import '@pnotify/core/dist/BrightTheme.css';
const { error,notice} = require('@pnotify/core');

const searchInput = e => {
   clenearCountri()
    const searchQuery = e.target.value;
    if (searchQuery.length < 1)
return ;
   API.fetchCountries(searchQuery).then(showQuery).catch(noticeInfo) ;   
}
const showQuery = countries => {
//выкинуть ошибку по запросу 
   if (countries.length>10){
    errorMessage('Очень много совпадений!');
    
}
else if(countries.status===404)
errorMessage(`Oшибка ${countries.status}`);

// отобразить карточку страны
else if(countries.length===1){
    console.log(countries[0])
renderCountry(countries[0],cardCountri);
}
//отобразить список стран
else if(countries.length<10){
renderCountry(countries , listSearchCountries);
}
}
// рендерим на страницу результат
function renderCountry (countries,templates){
    refs.cardContainer.innerHTML =templates(countries);
};
// обнавляем интерфейс при новом запросе
function clenearCountri (){
    refs.cardContainer.innerHTML='';
}
function errorMessage(message) {
    error ({
        title: 'OPS!',
        text: `${message}`,
        delay: 1000,    
        });
}
const noticeInfo = () => {
        notice({
            title: 'OPS!',
            text: 'Попитка не удачна. Повторите позже)',
            delay: 1000,
        });
    }



refs.search.addEventListener('input', debounce (searchInput , 500));