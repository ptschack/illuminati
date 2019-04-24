function resetAll() {
    Array.from(document.getElementsByTagName('select'))
        .filter(e => e.multiple)
        .forEach(e => e.selectedIndex = '-1');
    Array.from(document.getElementsByTagName('select'))
        .filter(e => !e.multiple)
        .forEach(e => e.selectedIndex = '0');
    Array.from(document.getElementsByTagName('input'))
        .filter(e => e.type.toLowerCase() == 'number')
        .forEach(e => {
            e.value = '0';
        });
}

function calculate() {
    //document.getElementById('')

    var result = 0;
    var attackMode = document.getElementById('attackMode').value;
    var attackerValue = document.getElementById('attackerValue').value;
    var targetValue = document.getElementById('targetValue').value;

    if (attackMode == 'control'){
        result = attackerValue - targetValue;
    } else if (attackMode == 'neutralize'){

    } else if (attackMode == 'destroy'){

    } else {

    }

    document.getElementById('result').innerHTML = result;
}