'use strict'

/* Variables */
let coursesEl = document.getElementById("courses");
let addCourseBtn = document.getElementById("addCourse");
let codeInput = document.getElementById("code");
let nameInput = document.getElementById("name");
let progressionInput = document.getElementById("progression");
let coursesyllabusInput = document.getElementById("coursesyllabus");


/* Eventlisteners */
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);

/* Functions */
function getCourses() {
    coursesEl.innerHTML = '';
    /* fetching data from URL */
    fetch("http://localhost:8888/moment5/api/read.php")
        .then(response => response.json()
            .then(data => {
                /* for all fetched data do following*/
                data.forEach(courses => {
                    /* print so screen from course object */
                    coursesEl.innerHTML +=
        `<div class="course"> 
            <p> 
            <b> Kod:</b> ${courses.code} <br/>
            <b> Namn:</b> ${courses.name}<br/>
            <b> Progression:</b> ${courses.progression}<br/>
            <b> Kursplan:</b> <a class="syllabus_link" href="${courses.coursesyllabus}" target="_blank">${courses.coursesyllabus}</a></p>
            <button id="${courses.id}" onClick="deleteCourse(${courses.id})">Radera</button>
        </div>`

                })
            }))
}

function deleteCourse(id) {
        /* fetching data from URL */
    fetch("http://localhost:8888/moment5/api/delete.php?id=" + id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

function addCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let coursesyllabus = coursesyllabusInput.value;

    let courses = {
        'code': code,
        'name': name,
        'progression': progression,
        'coursesyllabus': coursesyllabus
    };

    fetch("http://localhost:8888/moment5/api/create.php", {
            method: "POST",
            body: JSON.stringify(courses),
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

    /* clear input field when data is sent or on reload*/ 
    document.getElementById('name').value = '';
    document.getElementById('code').value = '';
    document.getElementById('progression').value = '';
    document.getElementById('coursesyllabus').value = '';


}