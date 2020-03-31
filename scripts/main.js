import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCred = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchMinimum = document.getElementById("search-minimum");
var inputSearchMaximum = document.getElementById("search-maximum");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCred.onclick = function () { return applyFilterByCredits(); };
renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderStudentInTable(student) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Cedula</td> <td>" + student.cedula + "</td>";
    studentTbody.appendChild(trElement);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>C\u00F3digo</td> <td>" + student.codigo + "</td>";
    studentTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>Direccion</td> <td>" + student.direccion + "</td>";
    studentTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>Edad</td> <td>" + student.edad + "</td>";
    studentTbody.appendChild(trElement4);
    var trElement5 = document.createElement("tr");
    trElement5.innerHTML = "<td>Telefono</td> <td>" + student.telefono + "</td>";
    studentTbody.appendChild(trElement5);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var minimum = Number(inputSearchMinimum.value);
    minimum = (inputSearchMaximum.value == '' || isNaN(minimum)) ? 0 : minimum;
    var maximum = Number(inputSearchMaximum.value);
    maximum = (inputSearchMaximum.value == '' || isNaN(maximum)) ? 10 : maximum;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(minimum, maximum, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(minimum, maximum, courses) {
    return courses.filter(function (c) { return c.credits >= minimum && c.credits <= maximum; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
