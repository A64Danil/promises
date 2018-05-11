/**
 * Created by Danil on 09.05.2018.
 */
console.log('Node js working. Тест русских символов')

var money = 100;
var counter = 0;

sumka.textContent = money;

function buyTicket(count) {
    console.log('Внутри buyTicket');
    var thisPromiseCount = count;
    sumka.textContent = money;
    var action = function () {

        return new Promise((resolve, reject) => {
            window.setTimeout(function () {
                    if (money >= 35) {
                        resolve('Деньги есть, покупаем билет')
                    }
                    else {
                        reject('У вас не хватает денег')
                    }
                }
                , Math.random() * 2000 + 1000);

        })
    }

    action()
        .then(resolve => {
            console.log(resolve);
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Внутри buyTicket <span>' + resolve + '</span> (Денег осталось - ' + money + ')</p>'
            );
        })
        .then(() => {
            money = money - 35;
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Последний then внутри buyTicket<span>Билет куплен успешно! </span> (Денег осталось - ' + money + ')</p>'
             );
        })
        .catch(reject => {
            console.log(reject);
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Последний buyTicket  cath <span>' + reject + '</span> (Денег осталось - ' + money + ')</p>'
            );
        })
        .then(() => {
                sumka.textContent = money;
        })


}

function onBtnClick() {
    var shower = document.getElementById('shower');

    money = money - 5;
    sumka.textContent = money;

    var thisPromiseCount = ++counter;
    shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
        ') Кликнули на кнопку <span>Отправили запрос на покупку</span> (Денег осталось - ' + money + ')</p>'
    );

    var number = Math.random().toFixed(1);
    console.log(number);
    var ticket = function () {
        shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') Создали промис <span>Пришли на вокзал</span> (Денег осталось - ' + money + ')</p>'
        );

        return new Promise((resolve, reject) => {

            if (number > 0.5) {
                //resolve('Деньги есть, покупаем билет')
                resolve('Вы пришли вовремя. Пытаемся купить, подождите')
            }
            else {
                //reject('У вас не хватает денег')
                reject('Сейчас обед. Приходите позже')
            }
        })
    };

    ticket()
        .then(resolve => {
            console.log(resolve);
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Первый then <span>' + resolve + '</span> (Денег пока еще - ' + money + ')</p>'
            );
            return thisPromiseCount;
        })
        .then((thisPromiseCount ) => {
            buyTicket(thisPromiseCount);
         })
        .then(() => {
            console.log('Шаг между резолвом и реджектом. Сюда мы попадаем ТОЛЬКО когда у нас резолв');
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Последний then <span>Жизнь идёт своим чередом, всё хорошо...</span> (Денег пока еще - ' + money + ')</p>'
            );
        })
        .catch(reject => {
            console.log(reject);
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                ') Последний cath <span>' + reject + '</span> (Денег осталось - ' + money + ')</p>'
            );
        })


}


button.addEventListener('click', onBtnClick);



var promiseCount = 0;
function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Запуск (запуск синхронного кода)<br>'
    );

    // Создаём обещание, возвращающее 'result' (по истечении 3-х секунд)
    var p1 = new Promise(
        // Функция разрешения позволяет завершить успешно или
        // отклонить обещание
        function(resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Запуск обещания (запуск асинхронного кода)<br>');
            // Это всего лишь пример асинхронности
            window.setTimeout(
                function() {
                    var number = Math.random().toFixed(1)
                    if (number > 0.5) {
                        // Обещание выполнено!
                        resolve(thisPromiseCount)
                    }
                    else {
                        reject(thisPromiseCount)
                    }
                }, Math.random() * 2000 + 1000);
        });

    // Указываем, что сделать с выполненным обещанием
    p1.then(
        // Записываем в протокол
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Обещание выполнено (асинхронный код завершён)<br>');
        },
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Обещание отклонено (асинхронный код завершён)<br>');
        },
        );

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Обещание создано (синхронный код завершён)<br>');
}

if ("Promise" in window) {
    let btn = document.getElementById("btn");
    btn.addEventListener("click",testPromise);
} else {
    log = document.getElementById('log');
    log.innerHTML = "Демонстрация невозможна, поскольку ваш браузер не поддерживает интерфейс <code>Promise<code>.";
}