
function elemsToFaces(elems) {
    return elems.map(elem => elem.innerText)
        .map(text => {
            const special = { 'J': 11, 'Q': 12, 'K': 13 };
            if (special[text]) return special[text];
            else return Number(text);
        });
}

function numberToElem(num) {
    const converted = numberToFace(num);
    const pickers = document.getElementsByClassName('picker');
    return Array.from(pickers).filter(picker => picker.innerText == converted)[0];
}

export function numberToFace(num) {
    const special = { 11: 'J', 12: 'Q', 13: 'K' };
    const converted = (special[num] ?? num) + '';
    return converted;
}

export function setupPickers(data, syncDataFunc) {
    const pickers = document.getElementsByClassName('picker');
    Array.from(pickers)
        .filter(picker => picker.id == '')
        .forEach(picker => {
            picker.onclick = () => picker.classList.toggle('selected');
            picker.classList.remove('blocked')
            picker.classList.add('noselect');
        });

    const resetBtn = document.getElementById('reset');
    resetBtn.onclick = () => {
        const selected = document.getElementsByClassName('selected');
        Array.from(selected).forEach(elem => elem.classList.toggle('selected'));
    }

    const sendBtn = document.getElementById('send');
    sendBtn.onclick = () => {
        const selected = document.getElementsByClassName('selected');
        const faces = elemsToFaces(Array.from(selected));
        faces.forEach(face => data[face].value -= 1);
        syncDataFunc();
        resetBtn.click();
        blockPicker(data);
    }
}

export function blockPicker(data) {
    Object.keys(data).forEach(key => {
        if (key == 'remainingCards') return;
        const value = data[key].value
        if (value > 0) return;
        const elem = numberToElem(key);
        elem.classList.add('blocked');
        elem.onclick = null;
    })

}