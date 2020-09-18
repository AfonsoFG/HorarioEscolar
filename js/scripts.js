async function getHorarioJson(path, callback) {
    return callback(await fetch(path).then(r => r.json()));
}

let changeDay = day => getHorarioJson('data/json/horario.json', (json) => {
    const currentDate = new Date();
    const todayNumeric = currentDate.getDay();
    const weekDays = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
    let horarioDoDia = json.days.filter(
        (item) => {
            if (todayNumeric % 6 !== 0) {
                return item[weekDays[day]];
            }
        }
    );
    if (horarioDoDia[0]) {
        renderTable(horarioDoDia[0][weekDays[day]])
    } else {
        renderEmptyTable();
    }
    
});

let renderTable = data => {
    const table = document.getElementsByTagName("table")[0];
    const fimDeSemana  = document.getElementById("fimDeSemana");

    if (table.style.display === "none") {
        table.style.display = "table";
    }

    if (fimDeSemana.style.display !== "none") {
        fimDeSemana.style.display = "none";
    }

    const rows = Array.from(table.rows);
    rows.forEach(elem => {
        if (elem.cells[1].dataset.periodo) {
            const val = data[elem.cells[1].dataset.periodo - 1];
            elem.cells[1].innerHTML = val ? '<img src="../img/icones/' + val + '.svg">' : '';
        }
    });
}

let renderEmptyTable = () => {
    const table = document.getElementsByTagName("table")[0];
    const fimDeSemana  = document.getElementById("fimDeSemana");

    if (table.style.display !== "none") {
        table.style.display = "none";
    }
    
    if (fimDeSemana.style.display === "none") {
        fimDeSemana.style.display = "block";
    }
    
}

let changeTheme = (event) => {
    event.preventDefault();

    const newTheme = event.explicitOriginalTarget.dataset.tema;
    const oldTheme = newTheme === 'azul' ? 'rosa' : 'azul';

    document.body.classList.remove(oldTheme),
    document.body.classList.add(newTheme);

    localStorage.setItem('theme', newTheme);
}

document.getElementById('selectDay').addEventListener('change', function () {
    changeDay(this.value);
});

let themes = document.getElementsByClassName('temas');

Array.from(themes).forEach(function(elem) {
    elem.addEventListener('click', changeTheme);
});

(init = () => {

    if (localStorage.getItem("theme")) {
        document.body.classList.add(localStorage.getItem("theme"));
    } else {
        document.body.classList.add('rosa')
    }

    const currentDate = new Date();
    const todayNumeric = currentDate.getDay();
    const weekDays = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];

    var selectDay = document.getElementById('selectDay');
    selectDay.options[todayNumeric - 1].selected = true;
    selectDay.options[todayNumeric - 1].prepend('[HOJE] ');
    changeDay(todayNumeric);
})();