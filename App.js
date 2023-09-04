define(['jquery'], function ($) {
    var CustomWidget = function () {
        var self = this;
        

        function renderCF(name, selected, selected_before) {
            let items = [];
            Object.values(AMOCRM.constant("account").cf).forEach(function(cf){  //обращаемся к глобал объекту, после в нём к функции констант в ней передаём аргумент аккаунт и после этого обрашемся в нём к CF это поля в полях находим свой чтобы создать мултивыбор
                items.push({id: cf.ID, option: cf.NAME}) // добавляем в массив опцию для селекта
            })

            // predefined_cf - это поля штатные амосрм их ключи текстовые
            Object.values(AMOCRM.constant("account").predefined_cf).forEach(function(cf){  //обращаемся к глобал объекту, после в нём к функции констант в ней передаём аргумент аккаунт и после этого обрашемся в нём к CF это поля в полях находим свой чтобы создать мултивыбор
                items.push({id: cf.ID, option: cf.NAME}) 
            })

            return self.render({ ref: '/tmpl/controls/select.twig' }, {
                id: name,
                items: items,
                selected: selected,
                selected_before: selected_before,
                class_name: 'my_select_sum'
            });
        };


        //=require Logger.js

        this.callbacks = {
            render: function () {
                return true;
            },
            init: function () {
                console.log(self);
                if (AMOCRM.data.is_card) {
                    initCard();


                    function initCard() {
                        let lead = AMOCRM.data.current_card.model;
                        lead.on('change', handleChangeModel);
                        updateSumm(lead);
                    }

                    function updateSumm(lead) {
                        let val1 = getCFValue(lead, getCustomFiedlKey(self.params["s1"]));
                        let val2 = getCFValue(lead, getCustomFiedlKey(self.params["s2"]));

                        let sumval = getCFValue(lead, getCustomFiedlKey(self.params["summa"]));

                        let value = parseInt(val1 == "" ? 0 : val1) + parseInt(val2 == "" ? 0 : val2);

                        if (sumval != value) {
                            $(`input[name="${getCustomFiedlKey(self.params["summa"])}"]`).val(value).trigger('change');
                        }
                    }


                    function getCFValue(model, key) {
                        return model.attributes[key];
                    }

                    function handleChangeModel(model) {
                        updateSumm(model);
                    }

                    function getCustomFiedlKey(id) {
                        return `CFV[${id}]`;
                    }
                }
                return true;
            },
            bind_actions: function () {
                
                return true;
            },
            settings: function ($modal_body) { //$modal_body - jquery-объект блока правой части модального окна виджета

                // код для скрытия лишних полей id выбора
                $modal_body.find('.widget_settings_block__item_field').hide();


                let valS1 = self.params["s1"]; // берём значение из ячейки памяти которая сохранилась
                let valS2 = self.params["s2"];
                let valSumma = self.params["summa"];

                $modal_body.find(".widget_settings_block__descr").append(renderCF('ts1', valS1,'Поле 1 (Слагаемое 1): ')); // вставляяем поля с выбором селект в настройки
                $modal_body.find(".widget_settings_block__descr").append(renderCF('ts2', valS2, 'Поле 2 (Слагаемое 2): '));
                $modal_body.find(".widget_settings_block__descr").append(renderCF('tsumma', valSumma, 'Поле Сумма: '));

                $modal_body.find('#ts1').on('controls:change', function (e){
                    var $input = $(e.currentTarget);
                    console.log('значение инпута', $input.val());

                    $modal_body.find('input[name="s1"]').val($input.val()).trigger('change');
                    
                })

                $modal_body.find('#ts2').on('controls:change', function (e){
                    var $input = $(e.currentTarget);
                    console.log('значение инпута', $input.val());

                    $modal_body.find('input[name="s2"]').val($input.val()).trigger('change');
                    
                })

                $modal_body.find('#tsumma').on('controls:change', function (e){
                    var $input = $(e.currentTarget);
                    console.log('значение инпута', $input.val());

                    $modal_body.find('input[name="summa"]').val($input.val()).trigger('change');
                    
                })

                $modal_body.find('.my_select_sum').css({'margin-bottom': '20px', color: '#f78d23'});
                $modal_body.find('.my_select_sum').first().css({'margin-top': '40px', color: '#f78d23'});

                return true;
            },
            onSave: function () {
                return true;
            },
            destroy: function () {
                return true;
            }
        };
        return this;
    };

    return CustomWidget;
});
