// Это основной код виджета


init: function () {
    // Выводим в консоль значение переменной self
    console.log(self);

    // Проверяем, является ли текущая страница карточкой записи в AMOCRM
    if (AMOCRM.data.is_card) {
        // Вызываем функцию инициализации карточки
        initCard();

        // Определение функции инициализации карточки
        function initCard() {
            // Получаем объект модели текущей карточки типа lead
            let lead = AMOCRM.data.current_card.model;
            
            // Подписываемся на событие изменения модели lead и передаем функцию обработчика handleChangeModel
            lead.on('change', handleChangeModel);
            
            // Обновляем сумму с помощью функции updateSumm
            updateSumm(lead);
        }

        // Определение функции обновления суммы
        function updateSumm(lead) {
            // Получаем значения пользовательских полей s1 и s2 из модели lead
            let val1 = getCFValue(lead, getCustomFiedlKey(self.params["s1"]));
            let val2 = getCFValue(lead, getCustomFiedlKey(self.params["s2"]));
            
            // Получаем значение суммы из пользовательского поля summa
            let sumval = getCFValue(lead, getCustomFiedlKey(self.params["summa"]));
            
            // Вычисляем новое значение суммы путем сложения val1 и val2
            let value = parseInt(val1 == "" ? 0 : val1) + parseInt(val2 == "" ? 0 : val2);
            
            // Проверяем, отличается ли вычисленное значение суммы от текущего значения суммы
            if (sumval != value) {
                // Обновляем значение суммы в соответствующем поле на странице и инициируем событие 'change'
                $(`input[name="${getCustomFiedlKey(self.params["summa"])}"]`).val(value).trigger('change');
            }
        }

        // Определение функции получения значения пользовательского поля из модели
        function getCFValue(model, key) {
            return model.attributes[key];
        }

        // Определение функции обработки изменения модели
        function handleChangeModel(model) {
            // Обновляем сумму, передавая модель lead в функцию updateSumm
            updateSumm(model);
        }

        // Определение функции для получения ключа пользовательского поля
        function getCustomFiedlKey(id) {
            return `CFV[${id}]`;
        }
    }
    // Возвращаем 'true' в качестве результата выполнения функции init
    return true;
},
