define(['jquery'], function ($) {
    var CustomWidget = function () {
        var self = this;
        //=require Templater.js
        //=require Logger.js

        this.callbacks = {
            render: function () {
                return true;
            },
            init: function () {
                console.log(self);
                if(AMOCRM.data.is_card){
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
                        
                        if(sumval != value) {
                            $(`input[name="${getCustomFiedlKey(self.params["summa"])}"]`).val(value).trigger('change');
                        }
                      }
                
                
                    function getCFValue(model, key) {
                        return model.attributes[key];
                    }
                
                    function handleChangeModel (model) {
                        updateSumm(model);
                    }
                
                    function getCustomFiedlKey(id) {
                    return `CFV[${id}]`;
                    }
                }
                return true;
            },
            bind_actions: function () {
                Logger.log('BIND WIDGET ACTIONS');
                return true;
            },
            settings: function ($modal_body) { //$modal_body - jquery-объект блока правой части модального окна виджета

                
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
