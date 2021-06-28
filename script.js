/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let virAd = document.querySelectorAll('.promo__adv img'),
        img = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        genre = document.querySelector('.promo__genre'),
        addInput = document.querySelector('.adding__input'),
        addForm = document.querySelector('.add'),
        checkbox = addForm.querySelector('[type = "checkbox"]');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let favourite = checkbox.checked,
            newFilm = addInput.value;

        if (newFilm) {

            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0,22)}...`;
            }

            if(favourite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        e.target.reset();

    });

    let adCleaner = (ad) => {
        ad.forEach(e => e.remove());
    };

    let newChanges = () => {
        genre.textContent = 'Драма';

        // img.style.cssText = 'background :  url(img/bg.jpg) no-repeat 50% 25%; width:100%' ;

        img.style.backgroundImage = 'url("img/bg.jpg")';
    };

    let sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {

        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item"> ${i + 1}. ${film}
                     <div class="delete"></div>
                </li>    
            `;
        });

        document.querySelectorAll('.delete').forEach( (btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(movieDB.movies, movieList);
            });
        });
    }

    adCleaner(virAd);
    newChanges();
    createMovieList(movieDB.movies, movieList);
});