let genres = document.getElementById('genres');

let newOption = document.createElement('option');

newOption.value = 'classic';
newOption.innerHTML = 'Классика';

genres.appendChild(newOption);

newOption.selected = true;

// 2
let text = null;
let view = document.getElementById('view');

view.onclick = function() {
    editStart();
};

function editStart() {
    text = document.createElement('textarea');
    text.className = 'edit';
    text.value = view.innerHTML;

    text.onkeydown = function(event) {
    if (event.key == 'Enter') {
        this.blur();
    }
    };

    text.onblur = function() {
    editEnd();
    };

    view.replaceWith(text);
    text.focus();
}

function editEnd() {
    view.innerHTML = text.value;
    text.replaceWith(view);
}


// 3

let table = document.getElementById('bagua-table');

let editingTd;

table.onclick = function(event) {
    let target = event.target.closest('.edit-cancel,.edit-ok,td');
    if (!table.contains(target)) return;
    if (target.className == 'edit-cancel') {
        finishEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
        finishEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
        if (editingTd) return;

        Edit(target);
    }
};

function Edit(td) {
    editingTd = {
        elem: td,
        data: td.innerHTML
    };

    td.classList.add('edit-td');

    let textArea = document.createElement('textarea');
    textArea.style.width = td.clientWidth + 'px';
    textArea.style.height = td.clientHeight + 'px';
    textArea.className = 'edit-area';

    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    textArea.focus();

    td.insertAdjacentHTML("beforeEnd",
        '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
    );
}

function finishEdit(td, fin) {
    if (fin) {
        td.innerHTML = td.firstChild.value;
    } else {
        td.innerHTML = editingTd.data;
    }
    td.classList.remove('edit-td');
    editingTd = null;
}

//4

let form = document.forms.calculator;

form.money.oninput = calculate;
form.months.onchange = calculate;
form.proc.oninput = calculate;

function calculate() {
    let initial = +form.money.value;
    if (!initial) return;

    let proc = form.proc.value * 0.01;

    if (!proc) return;

    let years = form.months.value / 12;
    if (!years) return;

    let result = Math.round(initial * (1 + proc) ** years);

    let height = result / form.money.value * 100 + 'px';
    document.getElementById('height').style.height = height;
    document.getElementById('before').innerHTML = form.money.value;
    document.getElementById('after').innerHTML = result;
}

calculate();