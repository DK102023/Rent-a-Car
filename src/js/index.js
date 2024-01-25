import Swiper from 'swiper/bundle';
//import SwiperCore, { Lazy } from 'swiper/core';
import 'swiper/css/bundle';
//SwiperCore.use([Lazy]);
//import IMask from 'imask';
import Inputmask from 'inputmask';
//import VanillaMasker from 'vanilla-masker';
//import {mask} from "inputmask/lib/mask";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//Флашг действия над формой
var respEl = 1;
// Объект для хранения данных по формам
var formStorage = {};

//date-pickers
// Глобальные переменные для сохранения состояния flatpickr
var startDatePicker, endDatePicker;

// Функция для инициализации flatpickr
function initializeFlatpickr() {
    startDatePicker = flatpickr("#startDate", {
        enableTime: true,
        dateFormat: "Y-m-d ",
        minDate: "today",
        // Другие опции
    });

    endDatePicker = flatpickr("#endDate", {
        enableTime: true,
        dateFormat: "Y-m-d ",
        minDate: new Date(),
        // Другие опции
    });

    // Установка обработчика события изменения значения startDate
    startDatePicker.config.onChange.push(function (selectedDates, dateStr) {
        endDatePicker.config.minDate = dateStr;
    });
}
initializeFlatpickr();

/*function ResponseElement(formId, flag) {
    // Получаем элемент контейнера
    var modalContent = document.getElementById(formId);

    if (flag === 1) {
        // Очищаем содержимое контейнера и запоминаем его содержимое
        var savedContent = modalContent.innerHTML;
        modalContent.innerHTML = '';

        // Создаем новый div
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<p class="text-center">Спасибо, мы свяжемся с вами в ближайшее время!</p>';

        // Добавляем новый div в контейнер
        modalContent.appendChild(newDiv);

        // Сохраняем содержимое для последующего восстановления
        formStorage[formId] = savedContent;
    } else if (flag === 0) {
        // Восстанавливаем сохраненное содержимое формы, если оно существует
        var savedContent = formStorage[formId];
        if (savedContent !==undefined) {
            modalContent.innerHTML = savedContent;
            initializeFlatpickr();
        }
    }
}*/
function ResponseElement(formId, flag) {
    // Получаем элемент контейнера
    var modalContent = document.getElementById(formId);



    if (flag === 1) {
        // Скрываем содержимое контейнера
        if (modalContent) {
            modalContent.querySelector('.main-content').classList.add('d-none');
        }

        // Создаем новый div
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<p class="text-center thank-you">Спасибо, мы свяжемся с вами в ближайшее время!</p>';

        // Добавляем новый div в контейнер
        modalContent.appendChild(newDiv);


    } else if (flag === 0) {
        // Восстанавливаем скрытое содержимое формы
        if (modalContent) {
            modalContent.querySelector('.main-content').classList.remove('d-none');
        }
        // Удаляем благодарственное сообщение, если оно уже существует
        var thankYouMessage = modalContent.querySelector('.thank-you');
        if (thankYouMessage) {
            thankYouMessage.remove();
        }
            //initializeFlatpickr();
        //clearForm(formId);
        }
    }

// Обработчик клика на кнопках
document.querySelectorAll('.btn').forEach(function (button) {
    button.addEventListener('click', function () {
        var target = this.getAttribute('data-bs-target');

        // Проверка значения атрибута data-bs-target
        if (target === '#callingModal') {
            ResponseElement('form-calling', 0);
        } else if (target === '#CarArenda') {
            ResponseElement('form', 0);
        }

        // Дополнительный код для открытия модального окна, если это необходимо
        //  var modal = new bootstrap.Modal(document.querySelector(target));
        //  modal.show();
    });
});




///
/*function clearForm(formId) {
    var form = document.getElementById(formId);

    if (form) {
        form.reset();
    }
}*/
function clearForm(formId) {
    var formContainer = document.getElementById(formId);

    if (formContainer) {
        // Находим элемент <form> внутри родительского контейнера
        var form = formContainer.querySelector('form');

        if (form) {
            form.reset();
        }
    }
}
/**/
/*function resetModalFormError(){
    // Скрытие ошибок
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('tel-error').style.display = 'none';
    // Снятие красной рамки с полей
    document.getElementById('name-calling').classList.remove('is-invalid');
    document.getElementById('tel-calling').classList.remove('is-invalid');
}*/
function resetModalFormError(){
    // Получаем все элементы, у которых id содержит "-error"
    const errorElements = document.querySelectorAll('[id*="-error"]');

// Изменяем стиль каждого найденного элемента, чтобы сделать его невидимым
    errorElements.forEach((element) => {
        element.style.display = 'none';
    });
    // Получаем все элементы с классом "is-invalid"
    const invalidElements = document.querySelectorAll('.is-invalid');

// Удаляем класс "is-invalid" у каждого найденного элемента
    invalidElements.forEach((element) => {
        element.classList.remove('is-invalid');
    });


}



document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        on: {
            slideChangeTransitionEnd: function (swiper) {
                //console.log('CurrentActive:', swiper.activeIndex)
                var swiperContainer = document.querySelector('.swiper-container');
                // Получаем активный слайд
                var activeSlide = document.querySelector('.swiper-slide-active');

                // Получаем значения из атрибутов слайда
                var carInfo = activeSlide.getAttribute('data-car');
                var carPrice = activeSlide.getAttribute('data-price');

                // Получаем элементы в верстке для обновления
                var arendaInfo = document.getElementById('arenda-info');
                var arendaCarParagraph = arendaInfo.querySelector('p');
                var arendaActionPriceParagraph = arendaInfo.querySelector('.arenda-action-price');

                // Обновляем содержимое элементов в верстке
                arendaCarParagraph.textContent = carInfo;
                arendaActionPriceParagraph.textContent = "Стоимость аренды в сутки " + carPrice;
            }
        },
        // Настройки Swiper
        // Optional parameters
        loop: true,
        parallax: true,
        lazy : true,
        speed: 1000,

        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    var testimonial = new Swiper('.swiper-testimonials', {
        loopedSlides: 3, // Укажите общее количество слайдов для зацикливания
        slidesPerView: 3, // Отображаемые слайды при пагинации
        spaceBetween: 20,
        slidesPerGroup: 3, // Сколько слайдов прокручивается за раз
        loop: true,

        breakpoints: {
            // когда экран >=0px
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            // когда экран >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            // когда экран >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 30,
                slidesPerGroup: 1,
            },
            // когда экран >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 40,
                slidesPerGroup: 1,

            }
        },


        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.testimonials-pagination',
            //dynamicBullets: true,
            clickable: true,
            //slideToClicked: true,
        },
        navigation: {
            nextEl: '.testimonials-next',
            prevEl: '.testimonials-prev',
        },
    });




    //ScrollTop
    let mybutton = document.getElementById("btn-back-to-top");

// После скролла на 20px от верха докумета,  показываем кнопку
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
// Прокрутка наверх по клику кнопки
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // Периодическая анимация элемента
    var animatedElement = document.getElementById("animatedElement");

    function startBounceAnimation() {
        animatedElement.classList.add("animate__bounce");
        setTimeout(function() {
            animatedElement.classList.remove("animate__bounce");
        }, 1000); // Удаляем класс bounce через 1 секунду (время анимации)
    }

    // Запускаем анимацию через каждые 5 секунд
    setInterval(startBounceAnimation, 5000);





    //mask

    var phoneInput = document.getElementById('input-tel');
    Inputmask({
        mask: '+7 (999) 999-99-99',
        clearMaskOnLostFocus: false,
    }).mask(phoneInput);
    var phoneInput = document.getElementById('tel-calling');
    Inputmask({
        mask: '+7 (999) 999-99-99',
        clearMaskOnLostFocus: false,
    }).mask(phoneInput);



    //Main actions

    function sendFormData(formData, formId, successMessage, responseElementId) {
        // Опции запроса
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: formData.toString() // Преобразуем данные в строку и отправляем их в теле запроса
        };

        // Отправляем запрос
        fetch('https://testologia.site/checkout', requestOptions)
            .then(response => {
                // Проверяем статус ответа
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Преобразуем ответ в JSON
            })
            .then(response => {
                // Код, который выполнится при успешном выполнении запроса
                if (response.success) {
                    ResponseElement(responseElementId, 1);
                    alert(successMessage);
                } else {
                    alert('Возникла ошибка, позвоните нам и сделайте заказ');
                }
            })
            .catch(error => {
                // Код, который выполнится при ошибке запроса
                console.error('Ошибка:', error.message);
            });
    }

    //Валидация формы заявки
    document.getElementById('button-request').addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращение отправки формы
        const carList = document.getElementById('input-auto');
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const inputPoint = document.getElementById('input-point');
        const tenantName = document.getElementById('input-name');
        const tenantTel= document.getElementById('input-tel');
        const tenantEmail= document.getElementById('input-mail');
        const tenantMessage = document.getElementById('text-message');



        var carListError = document.getElementById('carList-error');
        var startDateInputError  = document.getElementById('startDate-error');
        var endDateInputError  = document.getElementById('endDate-error');
        var inputPointError = document.getElementById('inputPoint-error');
        var tenantNameError = document.getElementById('tenant-name-error');
        var tenantTelError = document.getElementById('tenant-tel-error');
        var tenantEmailError = document.getElementById('mail-error');
        // console.log(carListError.innerHTML);
        //console.log(startDateInput.value);
        function RequestFormSend() {
            var formData = new URLSearchParams();
            formData.append('name', tenantName.value);
            formData.append('car_type', carList.options[carList.selectedIndex].text);
            formData.append('start_date', startDateInput.value);
            formData.append('end_date', endDateInput.value);
            formData.append('point', inputPoint.options[inputPoint.selectedIndex].text);
            formData.append('tenant_phone', tenantTel.value);
            formData.append('tenant_email', tenantEmail.value);
            formData.append('tenant_message', tenantMessage && tenantMessage.value !== "" ? tenantMessage.value : 'Нет сообщения');

            sendFormData(formData, 'form', 'Форма отправлена', 'form');
        }

        resetModalFormError();
        var errorFlag = 7;
        var emailPattern =/^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        // console.log(carList.selectedIndex);
        if (carList.selectedIndex == 0) {

            carListError.style.display = 'block';
            carList.classList.add('is-invalid');
            errorFlag--;
        }
        if (!startDateInput.value) {

            startDateInputError.style.display = 'block';
            startDateInput.classList.add('is-invalid');
            errorFlag--;
        }
        if (!endDateInput.value) {
            endDateInputError.style.display = 'block';
            endDateInput.classList.add('is-invalid');
            errorFlag--;
        }
        if (inputPoint.selectedIndex == 0) {

            inputPointError.style.display = 'block';
            inputPoint.classList.add('is-invalid');
            errorFlag--;
        }
        if (!tenantName.checkValidity() || tenantName.value.length < 4) {
            tenantNameError.style.display = 'block';
            tenantName.classList.add('is-invalid');
            errorFlag--;
        }
        if (tenantTel.value.replace(/\D/g, '').length !== 11) {
            // Если в номере не 11 цифр (включая код страны), считаем его невалидным
            tenantTelError.style.display = 'block';
            tenantTel.classList.add('is-invalid');
            errorFlag--;
        } else {
            tenantTelError.style.display = 'none';
            tenantTel.classList.remove('is-invalid');
        }
        if(!tenantEmail.value.match(emailPattern)){

            tenantEmailError.style.display = 'block';
            tenantEmail.classList.add('is-invalid');
            errorFlag--;
            //console.log(tenantEmail.value);
        }else {
            tenantEmailError.style.display = 'none';
            tenantEmail.classList.remove('is-invalid');
        }
        // Проверка условия валидации для всех полей
        if ( errorFlag === 7 ) {
            alert('Форма заполнена!');
            RequestFormSend();
        }

    });






    // Валидация формы звонка
    document.getElementById('button-calling').addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращение отправки формы

        var nameInput = document.getElementById('name-calling');
        var telInput = document.getElementById('tel-calling');
        var nameError = document.getElementById('name-error');
        var telError = document.getElementById('tel-error');
        var errorFlag=2;

        function CallFormSend() {
            var formData = new URLSearchParams();
            formData.append('name', nameInput.value);
            formData.append('phone', telInput.value);

            sendFormData(formData, 'form-calling', 'Форма обратного звонка отправлена', 'form-calling');
        }



        // Сброс предыдущих ошибок
        resetModalFormError();


        // Валидация имени
        if (!nameInput.checkValidity()) {
            nameError.style.display = 'block';
            nameInput.classList.add('is-invalid');
            errorFlag--;
        }

        // Валидация телефона
        if (telInput.value.replace(/\D/g, '').length !== 11) {
            // Если в номере не 11 цифр (включая код страны), считаем его невалидным
            telError.style.display = 'block';
            telInput.classList.add('is-invalid');
            errorFlag--;
        } else {
            telError.style.display = 'none';
            telInput.classList.remove('is-invalid');
        }
        if (errorFlag == 2){
            CallFormSend();
        }
    });

    //
    // Событие при закрытии модального окна заказа обратного звонка
    var callingModal = document.getElementById('callingModal');
    if (callingModal) {
        callingModal.addEventListener('hidden.bs.modal', function () {
            clearForm('form-calling');
            resetModalFormError();
        });
    }

// Событие при закрытии модального окна заказа машины
    var btnForm = document.getElementById('btn-form');
    if (btnForm) {
        btnForm.addEventListener('click', function (event) {
            clearForm('form');
            resetModalFormError();

            // Находим все элементы с классом flatpickr-input
            var flatpickrInputs = document.querySelectorAll('.flatpickr-input');

            // Проходим по каждому элементу и вызываем метод clear() для каждого экземпляра Flatpickr
            flatpickrInputs.forEach(function (input) {
                if (input._flatpickr && typeof input._flatpickr.clear === 'function') {
                    input._flatpickr.clear();
                }
            });
        });
    }

    //



    document.getElementById('calling-button').addEventListener('click', function (event) {
        //event.preventDefault();
        resetModalFormError();
        // Получаем текст из элемента с идентификатором arenda-info
        var carInfoText = document.getElementById('arenda-info').querySelector('p').textContent.trim();

        // Отсекаем слово "Lamborghini" и крайние пробелы
        var trimmedText = carInfoText.replace('Lamborghini', '').trim();
        console.log(trimmedText);
        // Получаем элемент выпадающего списка input-auto
        var inputAuto = document.getElementById('input-auto');

        // Находим соответствующий элемент в выпадающем списке и устанавливаем его как выбранный
        for (var i = 0; i < inputAuto.options.length; i++) {
            if (inputAuto.options[i].text === trimmedText) {
                inputAuto.selectedIndex = i;
                break;
            }
        }





    });

    new WOW().init();



});

