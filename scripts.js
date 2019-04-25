function resetAll() {
    Array.from(document.getElementsByTagName('select'))
        .filter(e => e.multiple)
        .forEach(e => e.selectedIndex = -1);
    Array.from(document.getElementsByTagName('select'))
        .filter(e => !e.multiple)
        .forEach(e => e.selectedIndex = 0);
    Array.from(document.getElementsByTagName('input'))
        .filter(e => e.type.toLowerCase() == 'number')
        .forEach(e => {
            e.value = 0;
        });
    calculate();
    attackModeChanged();
}

function attackModeChanged() {
    var attackMode = document.getElementById('attackMode').value;

    var displayResistance = attackMode == 'control' || attackMode == 'neutralize' ? 'block' : 'none';
    document.getElementById('targetResistanceLabel').style.display = displayResistance;
    document.getElementById('targetResistance').style.display = displayResistance;

    var displayPower = attackMode == 'destroy' ? 'block' : 'none';
    document.getElementById('targetPowerLabel').style.display = displayPower;
    document.getElementById('targetPower').style.display = displayPower;

    calculate();
}

function countOppositeAlignments(attackerAlignments, defenderAlignments) {
    var i = 0;
    if ((attackerAlignments.includes('government') && defenderAlignments.includes('communist'))
        || (attackerAlignments.includes('communist') && defenderAlignments.includes('government'))) {
        i++;
    }
    if ((attackerAlignments.includes('liberal') && defenderAlignments.includes('conservative'))
        || (attackerAlignments.includes('conservative') && defenderAlignments.includes('liberal'))) {
        i++;
    }
    if ((attackerAlignments.includes('peaceful') && defenderAlignments.includes('violent'))
        || (attackerAlignments.includes('violent') && defenderAlignments.includes('peaceful'))) {
        i++;
    }
    if ((attackerAlignments.includes('straight') && defenderAlignments.includes('weird'))
        || (attackerAlignments.includes('weird') && defenderAlignments.includes('straight'))) {
        i++;
    }
    if (attackerAlignments.includes('fanatic') && defenderAlignments.includes('fanatic')) {
        i++;
    }
    return i;
}

function countSameAlignments(attackerAlignments, defenderAlignments) {
    var i = 0;
    if (attackerAlignments.includes('government') && defenderAlignments.includes('government')) {
        i++;
    }
    if (attackerAlignments.includes('communist') && defenderAlignments.includes('communist')) {
        i++;
    }
    if (attackerAlignments.includes('liberal') && defenderAlignments.includes('liberal')) {
        i++;
    }
    if (attackerAlignments.includes('conservative') && defenderAlignments.includes('conservative')) {
        i++;
    }
    if (attackerAlignments.includes('peaceful') && defenderAlignments.includes('peaceful')) {
        i++;
    }
    if (attackerAlignments.includes('violent') && defenderAlignments.includes('violent')) {
        i++;
    }
    if (attackerAlignments.includes('straight') && defenderAlignments.includes('straight')) {
        i++;
    }
    if (attackerAlignments.includes('weird') && defenderAlignments.includes('weird')) {
        i++;
    }
    if (attackerAlignments.includes('criminal') && defenderAlignments.includes('criminal')) {
        i++;
    }
    return i;
}

function calculate() {
    var result = 0;
    var attackMode = document.getElementById('attackMode').value;
    var attackerPower = parseInt(document.getElementById('attackerPower').value);
    var targetResistance = parseInt(document.getElementById('targetResistance').value);
    var targetPower = parseInt(document.getElementById('targetPower').value);
    var transferablePower = parseInt(document.getElementById('transferablePower').value);
    var attackerAlignments = Array.from(document.getElementById('attackerAlignment').options)
        .filter(e => e.selected)
        .map(e => e.value);
    var defenderAlignments = Array.from(document.getElementById('defenderAlignment').options)
        .filter(e => e.selected)
        .map(e => e.value);
    var oppositeCounter = countOppositeAlignments(attackerAlignments, defenderAlignments);
    var sameCounter = countSameAlignments(attackerAlignments, defenderAlignments);
    var attackerMoney = parseInt(document.getElementById('attackerMoney').value);
    var defenderMoney = parseInt(document.getElementById('defenderMoney').value);
    var defenderIlluminatiMoney = parseInt(document.getElementById('defenderIlluminatiMoney').value);
    var otherIlluminatiAssist = parseInt(document.getElementById('otherIlluminatiAssist').value);
    var otherIlluminatiInterfere = parseInt(document.getElementById('otherIlluminatiInterfere').value);
    var proximityMod = parseInt(Array.from(document.getElementById('proximityMod').options)
        .find(e => e.selected)
        .value);

    result += attackerPower + transferablePower;

    if (attackMode == 'control' || attackMode == 'neutralize') {
        result -= targetResistance;
        result -= oppositeCounter * 4;
        result += sameCounter * 4;
    } else if (attackMode == 'destroy') {
        result -= targetPower;
        result += oppositeCounter * 4;
        result -= sameCounter * 4;
    }

    if (attackMode == 'neutralize') {
        result += 6;
    }

    result += attackerMoney;
    result -= defenderMoney * 2;
    result -= defenderIlluminatiMoney;
    result += otherIlluminatiAssist;
    result -= otherIlluminatiInterfere;
    result -= proximityMod;

    document.getElementById('result').innerHTML = result;
}