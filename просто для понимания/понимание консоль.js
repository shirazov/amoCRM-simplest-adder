// данный код можно вставить в консоль вразделе сделки и он будет работать без установки виджета


idS1 =1190385;
idS2 =1190387;
idSumma =1190383;


function initCard() {
    let lead = AMOCRM.data.current_card.model;
    lead.on('change', handleChangeModel);
    updateSumm(lead);
  }

  function updateSumm(lead) {
    let val1 = getCFValue(lead, getCustomFiedlKey(idS1));
    let val2 = getCFValue(lead, getCustomFiedlKey(idS2));

    let sumval = getCFValue(lead, getCustomFiedlKey(idSumma));

    let value = parseInt(val1 == "" ? 0 : val1) + parseInt(val2 == "" ? 0 : val2);
    
    if(sumval != value) {
        $(`input[name="${getCustomFiedlKey(idSumma)}"]`).val(value).trigger('change');
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


initCard();