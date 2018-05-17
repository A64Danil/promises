/**
 * Created by Danil on 09.05.2018.
 */
console.log('Node js working. Тест русских символов');

// Main body of sciprt
(function () {
    var money = 400;
    var counter = 0;
    button.addEventListener('click', onBtnClick);
    sumka.textContent = money;

    var isPress = 0;

    // Reject double press on button
    function btnCheker() {
        if (isPress == 0) {
            isPress = 1;
        }
        else {
            alert('вы уже нажали на кнопку, ждите!')
            return false;
        }
    }

    // Ckeck your money and start Loader
    function buyTicket(count) {
        var thisPromiseCount = count;
        sumka.textContent = money;

        if (money >= 35) {
            showLoader("showAgain"); // <==== Запускаем наш лоадер снова

            window.setTimeout( function () {
                shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                    ') Внутри buyTicket <span>Деньги есть, покупаем билет</span> (Денег осталось - ' + money + ')</p>'
                );
                money = money - 35;
                sumka.textContent = money;
                shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                    ') Внутри buyTicket <span>Билет куплен успешно!</span> (Денег осталось - ' + money + ')</p>'
                );

                __QL_isLoad = true;
            }, Math.random() * 2000 + 1000);

        }
        else {
            throw ('У вас не хватает денег');
        }

    }

    // Create promise on btn-click
    function onBtnClick() {
        var shower = document.getElementById('shower');

        if (btnCheker() == false) {
            return;
        }
        __QL_isLoad = false;
        var thisPromiseCount = ++counter;
        shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') Кликнули на кнопку <span>Отправили запрос на покупку</span> (Денег осталось - ' + money + ')</p>'
        );

        var number = Math.random().toFixed(1);
        console.log(number);
        var ticket = function () {

            if (money >= 5 ) {
                money-= 5;
                // Main part - creating of promise
                return new Promise((resolve, reject) => {
                    money <= 0 ? reject('У вас нет денег') : sumka.textContent = money;
                sumka.textContent = money;
                shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                    ') Создали промис <span>Пришли на вокзал</span> (Денег осталось - ' + money + ')</p>'
                );

                if (number > 0.3) {
                    resolve('Вы пришли вовремя. Пытаемся купить, подождите')
                }
                else {
                    reject('Сейчас обед. Приходите позже')
                }
            })
            }
            else {
                shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                    ') промис не создан <span>У вас нет денег</span> (Денег - ' + money + ')' +
                    '<br> Перезагрузите страницу, чтобы попробовать снова.</p>'
                );
                isPress = 0;
            }

        };

        ticket()  // Если пришли во время, то...
            .then(resolve => { // Потом выводим инфо-собщение
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') Первый then <span>' + resolve + '</span> (Денег пока еще - ' + money + ')</p>'
        );
        return thisPromiseCount;
    })
    .then((thisPromiseCount ) => { // Потом пытаемся купить билет
            return buyTicket(thisPromiseCount);
    })
    .then(() => { // Потом выводим инфо-собщение
            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') После buyTicket <span>Ждём</span> (Денег осталось - ' + money + ')</p>'
        );
    })
    .then(() => { // Потом выводим инфо-собщение
            console.log('Шаг между резолвом и реджектом. Сюда мы попадаем ТОЛЬКО когда у нас резолв');
        shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') перед сет ТаймАут <span>Вот и пришла наша очередь!</span> (Денег осталось - ' + money + ')</p>'
        );
        // setTimeout(function () {
        //     __QL_isLoad = true;
        // }, 2000)
    })
    .catch(reject => { // Ловим ошибки если есть

            shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
            ') Последний cath <span>' + reject + '</span> (Денег осталось - ' + money + ')</p>'
        );
        __QL_isLoad = true;
    })
    .then(() => { // Потом выводим инфо-собщение
        // TODO: сделать такую асинхронность чтобы этот пункт всегда был последним <== не получается без
        // СетИнтервал в рамках одного промиса
        ;

        var timerId = setTimeout(function tick() {
            console.log(__QL_isLoad);
            console.log( 'тик' );
            if (__QL_isLoad !== true || __QL_isLoad === false) {
                console.log( 'не загрузилось' );
                timerId = setTimeout(tick, 2000);
            }
            else {
                isPress = 0;
                removeLoader();
                console.log( 'загрузилось, не запускаем новые проверки' );
                shower.insertAdjacentHTML('beforeend', '<p>' + thisPromiseCount +
                    ') Последний then в цепочке <span>Вы уходите домой</span> (Денег осталось - ' + money + ')' +
                    ' <br>Этот пункт всегда должен идти последним</p><hr>'
                );
            }

        }, 2000);


    })


    }

})();

// Test on support of promises
(function () {
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
})();

