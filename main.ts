import { Course } from './course.js';
import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCred: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchMinimum: HTMLInputElement = <HTMLInputElement> document.getElementById("search-minimum")!;
const inputSearchMaximum: HTMLInputElement = <HTMLInputElement> document.getElementById("search-maximum")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let studentTbody: HTMLElement = document.getElementById('student')!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCred.onclick = () => applyFilterByCredits();


renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentInTable(student: Student): void {
  console.log('Desplegando estudiante');
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Cedula</td> <td>${student.cedula}</td>`;
  studentTbody.appendChild(trElement);
  let trElement2 = document.createElement("tr");
  trElement2.innerHTML = `<td>Código</td> <td>${student.codigo}</td>`;
  studentTbody.appendChild(trElement2);
  let trElement3 = document.createElement("tr");
  trElement3.innerHTML = `<td>Direccion</td> <td>${student.direccion}</td>`;
  studentTbody.appendChild(trElement3);
  let trElement4 = document.createElement("tr");
  trElement4.innerHTML = `<td>Edad</td> <td>${student.edad}</td>`;
  studentTbody.appendChild(trElement4);
  let trElement5 = document.createElement("tr");
  trElement5.innerHTML = `<td>Telefono</td> <td>${student.telefono}</td>`;
  studentTbody.appendChild(trElement5);
}
function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByCredits() { 
  let minimum = Number(inputSearchMinimum.value);
  minimum = (inputSearchMaximum.value == '' || isNaN(minimum)) ? 0 : minimum;
  let maximum = Number(inputSearchMaximum.value);
  maximum = (inputSearchMaximum.value == '' || isNaN(maximum)) ? 10 : maximum;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(minimum, maximum, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

  
function searchCourseByCredits(minimum: number, maximum: number, courses: Course[]) {
  return courses.filter( c => c.credits >= minimum && c.credits <= maximum);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}