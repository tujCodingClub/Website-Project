import {timetableDataSpring, courseNameToCodeSpring, courseNameStringsSpring} from './TimetableDataSpring.js';
import {timetableDataSummer, courseNameToCodeSummer, courseNameStringsSummer} from './TimetableDataSummer.js';
import {timetableDataFall, courseNameToCodeFall, courseNameStringsFall} from './TimetableDataFall.js';
import {facultyNames} from "./FacultyNames.js";

let timetableData = timetableDataSummer;//data for all the courses
let courseNameStrings = courseNameStringsSummer;//data for all courses Name to Code
let courseNameToCode = courseNameToCodeSummer;//data for all courses Name to Code

document.getElementById("semesterSelect").addEventListener("change", function () {
    const selectedCourse = event.target.value;
    if (selectedCourse === "spring") {
        timetableData = timetableDataSpring;//data for all the courses
        courseNameStrings = courseNameStringsSpring;//data for all courses Name to Code
        courseNameToCode = courseNameToCodeSpring;//data for all courses Name to Code
    } else if (selectedCourse === "summer") {
        timetableData = timetableDataSummer;//data for all the courses
        courseNameStrings = courseNameStringsSummer;//data for all courses Name to Code
        courseNameToCode = courseNameToCodeSummer;//data for all courses Name to Code
    } else if (selectedCourse === "fall") {
        timetableData = timetableDataFall;//data for all the courses
        courseNameStrings = courseNameStringsFall;//data for all courses Name to Code
        courseNameToCode = courseNameToCodeFall;//data for all courses Name to Code
    }
});


// All the time we have so far, to avoid time conflict, we need it to be here
// TODO:send email
// TODO:deleteThis cookie
// TODO:a Better PDF
// Initializing the generate button, add event listener to it, so it can execute the following function
document.getElementById("generate").addEventListener("click", generateTimetable);
window.onload = function () {
    let cookie = getCookie("cookie");
    const cookieArray = cookie.split(",");
    for (let i = 1; i < cookieArray.length; i++) {
        printAllInfo(timetableData, cookieArray[i]);
        console.log(cookie);
    }
};
let cookieString = getCookie("cookie");
const times = [];

// Function for generating the timetable
function generateTimetable() {
    // The right click menu, so it can be removed when we generate the timetable
    if (document.getElementById("rightClickDelete") !== null) {
        document.getElementById("rightClickDelete").remove();
    }
    // Set the hasMenu to false, so when we click it again, it will show the menu
    hasMenu = false;
    // Options are for when there are some courses has the same course number, need to make it empty before generation
    const timetable = document.getElementById('options');
    timetable.innerHTML = '';
    // The time quote is for attempting to delete the date&time, so it can be removed when we generate the timetable
    document.getElementById("timeqoute").innerHTML = "";
    // Get the user input and covert it to only numbers or alphabets
    const userInput = document.getElementById("courseNumber").value;
    const courseNumber = userInput.replace(/\D/g, '');
    const courseName = userInput.replace(/[^a-zA-Z ]/g, '').trim();
    console.log("Course number entered:", courseNumber);//print user input
    // Start with the input only has numbers, so it will be a course number, and add specific info to it, then search
    // it in the data, if it is in the data, append it to the allInfoArray.
    let department = ['ACCT', 'ADV', 'AMST', 'ANTH', 'ARTU', 'ARTH', 'ASST', 'BIOL', 'CHEM', 'CHI', 'CMST', 'CSI', 'CIS', 'ECON', 'EDUC', 'ENG', 'ENVS', 'EURO', 'FREN', 'GEOG', 'GEOL', 'GERM', 'GREK', 'HIST', 'HUMA', 'IDIS', 'ITAL', 'JAPN', 'LATN', 'LGBT', 'LING', 'MATH', 'MUSC', 'PHIL', 'PHYS', 'POLS', 'PORT', 'PSYC', 'RELG', 'RUSS', 'SOCI', 'SPAN', 'SUST', 'THEA', 'WGST'];
    let onlineOrIn = ["(811)", "(812)", "(813)", "(814)", "(815)", "(816)", "(817)", "(818)", "(819)", "(750)", "(751)"];
    let allInfoArray = []
    for (let i = 0; i < department.length; i++)
        for (let j = 0; j < onlineOrIn.length; j++) {
            const allInfo = department[i] + " " + courseNumber + " " + onlineOrIn[j];
            const timetableInfo = timetableData[allInfo];
            if (timetableInfo) {
                allInfoArray.push(allInfo)

            }
        }
    // Try to find the course with the alphabets, which is supposed to be a course name, then search it in the data,
    // if it is in the data, append it to the allInfoArray.
    if (courseName !== '') {
        for (let i = 0; i < courseNameStrings.length; i++) {
            if (courseNameStrings[i] !== null) {
                if (courseNameStrings[i].toLowerCase().includes(courseName.toLowerCase())) {
                    if (Array.isArray(courseNameToCode[courseNameStrings[i]])) {
                        //if there is some courses has the same course name, prevent from it;
                        for (let j = 0; j < courseNameToCode[courseNameStrings[i]].length; j++) {
                            console.log(courseNameToCode[courseNameStrings[i]][j]);
                            allInfoArray.push(courseNameToCode[courseNameStrings[i]][j]);
                        }
                    } else {
                        allInfoArray.push(courseNameToCode[courseNameStrings[i]]);
                    }

                }
            }
        }
    }
    console.log("allInfoArray is: " + allInfoArray.length);//print the length of the allInfoArray
    //  if the allInfoArray is empty, means it's not found in data, display an error message
    if (allInfoArray.length === 0) {
        const timetableDiv = document.getElementById("notfound");
        timetableDiv.innerHTML = "<p>Timetable not found. Please enter a valid course number.</p>";
    } else if (allInfoArray.length === 1) {//if There is only one course, print it
        const timetableDiv = document.getElementById("notfound");
        timetableDiv.innerHTML = "";
        printAllInfo(timetableData, allInfoArray[0]);
    } else {        //Let user select when there is more course
        for (let i = 0; i < allInfoArray.length; i++) {
            const timetableDiv = document.getElementById("notfound");
            timetableDiv.innerHTML = "";
            selectAllInfo(timetableData, allInfoArray[i]);
        }
    }
}

// Print the course info on the timetable
function printAllInfo(timetableData, timetableInfo) {
    // Create a new row for the course and define its attributes
    const newCourse = document.createElement('tr');
    newCourse.className = "course";
    newCourse.setAttribute('data-info', timetableInfo);
    // Make the info has the all the info of the course
    timetableInfo = timetableData[timetableInfo];
    // Push the time of the course to the times array and check if there is a time conflict
    times.push(timetableInfo.time)
    const result = sortAndCheckTimeConflicts(times);
    const conflict = document.getElementById('error');

    if (result.hasConflict) {
        conflict.innerHTML = "<p>There is a time conflict</p>";
    } else {
        conflict.innerHTML = '';
    }
    // Append the new row to the timetable
    document.getElementById('timetable').appendChild(newCourse);
    // Create new cells for the course name and set its attributes
    const timeTd = document.createElement('td');
    const timeTdM = document.createElement('td');
    const timeTdT = document.createElement('td');
    const timeTdW = document.createElement('td');
    const timeTdTh = document.createElement('td');
    const timeTdF = document.createElement('td');
    timeTdM.className = "M";
    timeTdT.className = "T";
    timeTdW.className = "W";
    timeTdTh.className = "Th";
    timeTdF.className = "F";
    // The time info is like date and time, so we need to split it
    let date = timetableInfo.time.split(" ")[0];
    if(timetableInfo.time === "Arr") {
        date = "M";
        timeTd.innerHTML = `<p>Arr</p>`
    }
    else {
        timeTd.innerHTML = `<p> ${timetableInfo.time.split(" ")[1]}</p>`
    }
    // Check the date and append the time info to the corresponding cell
    for (let i = 0; i < date.length; i++) {
        if (date[i] === 'M') {
            addInto(timeTdM, timetableInfo);
        } else if (date[i] === 'W') {
            addInto(timeTdW, timetableInfo);
        } else if (date[i] === 'F') {
            addInto(timeTdF, timetableInfo);
        } else if (date[i] === 'T') {
            if (date[i + 1] === 'h') {
                addInto(timeTdTh, timetableInfo);
            } else {
                addInto(timeTdT, timetableInfo);
            }
        }
    }
    // Append the cells to the new row
    newCourse.appendChild(timeTd);
    newCourse.appendChild(timeTdM);
    newCourse.appendChild(timeTdT);
    newCourse.appendChild(timeTdW);
    newCourse.appendChild(timeTdTh);
    newCourse.appendChild(timeTdF);
    // Put the new course in the right place based on sorted times
    for (let i = 0; i < result.sortedTimes.length; i++) {
        const timeOutAndSign = timetableInfo.time.split(" &")[0];
        if (timeOutAndSign === result.sortedTimes[i].toString()) {
            let row1 = document.getElementById("timetable").rows[result.sortedTimes.length];
            console.log(row1);
            let row2 = document.getElementById("timetable").rows[i + 1];
            console.log(row2);
            // Insert row1 before row2
            row2.parentNode.insertBefore(row1, row2);
            return;
        }
    }
}


//this is for function printAllInfo, it adds the necessary info to the child of timetable
function addInto(timeTd, timetableInfo) {
    //set cookie
    let cookie = getCookie("cookie");
    const stringArray = cookie.split(",");
    let hasCookie = false;
    for (let i = 0; i < stringArray.length; i++) {
        if (stringArray[i] === timetableInfo.courseCode) {
            hasCookie = true;
        }
    }
    if (!hasCookie) {
        cookieString = cookieString.concat(',', timetableInfo.courseCode);
        console.log("cookie saved", cookieString)
        setCookie("cookie", cookieString, 7);
    }
    // Set the professor link
    let professorLink = timetableInfo.professor;
    for (const professor of facultyNames) {
        if (professor.split(" ")[professor.split(" ").length - 1] === (timetableInfo.professor.toString().split(",")[0])) {
            professorLink = "../PROFS/" + professor.toLowerCase().replaceAll(" ", "") + ".html";
            break;
        }
    }
    // Check if the course has gened requirement and add all the info to the cell
    if (timetableInfo.gened === '') {
        timeTd.innerHTML = `<p> ${timetableInfo.courseName}</p>
                            <p> ${timetableInfo.courseCode}</p>
                                <p><a href=${professorLink.toString()} class="prof-link">${timetableInfo.professor}</a> </p>
                              <p> ${timetableInfo.location}</p>
                               <p> ${timetableInfo.credits}</p>`;
    } else {
        timeTd.innerHTML = `<p> ${timetableInfo.courseName}</p>
                            <p> ${timetableInfo.courseCode}</p>
                                <p><a href=${professorLink.toString()} class="prof-link">${timetableInfo.professor}</a> </p>
                              <p> ${timetableInfo.location}</p>
                               <p> ${timetableInfo.credits}</p>
                            <p> ${timetableInfo.gened}</p>`;
    }
}


//this is for select when there are more than one course have the same courseNum
function selectAllInfo(timetableData, timetableInfo) {
    //create a button for each course, and add the info to the button
    const newButton = document.createElement('button');
    newButton.innerHTML = `<p> ${timetableData[timetableInfo].courseName}</p>
                           <p> ${timetableData[timetableInfo].time}</p>
                         <p>${timetableInfo}</p>`;
    //set the className of the button to the courseNum
    newButton.className = timetableInfo;
    //append the button to the options
    const timetable = document.getElementById('options');
    timetable.appendChild(newButton);
    //when click the button, it will call the function selection
    newButton.addEventListener('click', selection.bind(newButton));

}

//for select clickListener
function selection() {
    //get the courseNum from the button and covert it to string, className is the courseNum.
    const courseInfo = this.className;
    const courseInfoString = courseInfo.toString();
    //clear the options
    const options = document.getElementById('options');
    options.innerHTML = '';
    console.log("You selected: " + courseInfoString);//print the courseNum
    //call the function printAllInfo
    printAllInfo(timetableData, courseInfoString);


}

//this is for sort time
function sortAndCheckTimeConflicts(times) {
    // Convert input times to objects with day and time properties
    const dayAbbrevs = {"M": 0, "T": 1, "W": 2, "h": 3, "F": 4};
    let arrCount = 0;
    for (let i = 0; i < times.length; i++) {
        if (times[i] === 'Arr') {
            times.splice(i, 1);
            arrCount++;
        }
    }
    const timeObjects = times.map(time => {
            const [days, timespan] = time.split(" ");

            const [startTime, endTime] = timespan.split("-");
            const [startHour, startMin] = startTime.split(":").map(num => parseInt(num));
            const [endHour, endMin] = endTime.split(":").map(num => parseInt(num));
            return {
                days: days.split("").map(day => day === "h" ? 3 : dayAbbrevs[day]),
                start: startHour * 60 + startMin,
                end: endHour * 60 + endMin
            };
    });
    // Sort time objects by start time and then by day
    timeObjects.sort((a, b) => a.start - b.start);
    console.log(timeObjects)

    // Check for conflicts
    let hasConflict = false;
    for (let i = 0; i < timeObjects.length - 1; i++) {
        const curr = timeObjects[i];
        const next = timeObjects[i + 1];
        for (let j = 0; j < curr.days.length; j++) {
            for (let k = 0; k < next.days.length; k++) {
                if (curr.days[j] === next.days[k] && curr.end > next.start) {
                    hasConflict = true;
                    break;
                }
            }
        }
    }
    timeObjects.map(time => `${time.days.map(day => Object.keys(dayAbbrevs).find(key => dayAbbrevs[key] === day)).join("")} ${Math.floor(time.start / 60).toString().padStart(1, "")}:${(time.start % 60).toString().padStart(2, "0")}-${Math.floor(time.end / 60).toString().padStart(2, "0")}:${(time.end % 60).toString().padStart(2, "0")}`);
    for(let i = 0; i < arrCount; i++){
        timeObjects.push('Arr');
    }
    // Return sorted times and whether there is a conflict
    return {
        sortedTimes: timeObjects,
        hasConflict
    };
}

// After this line, it's for the right click menu and zoom in function
let hasMenu, hasZoomedIn = false;
window.addEventListener("contextmenu", e => e.preventDefault());
let table = document.getElementById("timetable");

// An event listener for the right click menu
document.addEventListener("mousemove", function (e) {
    if (e.target.id !== "rightClickDelete" && document.getElementById("context-menu") !== null) {
        document.getElementById("context-menu").style.filter = "";
    }
});
table.addEventListener("mousedown", function (e) {
    // Set the target to the clicked element
    const target = e.target;
    // If the target has context and zoomed in is not applied
    if ((target.innerHTML.trim() !== "" && !hasZoomedIn)) {
        // Create a context menu and set class and id
        const contextMenu = document.createElement("div");
        contextMenu.className = "context-menu";
        contextMenu.id = "rightClickDelete";
        // Create a menu item and set innerHTML
        const menuItemDeleteAll = document.createElement("div");
        const menuItemDeleteThis = document.createElement("div");
        menuItemDeleteAll.innerHTML = `<p id = "deleteAll">Delete All</p>`;
        menuItemDeleteThis.innerHTML = `<p id = "deleteThis">Delete This</p>`;
        contextMenu.appendChild(menuItemDeleteAll);
        contextMenu.appendChild(menuItemDeleteThis);
        // Append the menu item to the context menu
        contextMenu.children.item(0).addEventListener("mousemove", function () {
            menuItemDeleteAll.children.item(0).style.cursor = 'pointer';
        });
        contextMenu.children.item(0).addEventListener("click", function () {
            // if there is a menu, remove it and set hasMenu to false
            if (document.getElementById("rightClickDelete") !== null) {
                document.getElementById("rightClickDelete").remove();
            }
            hasMenu = false;
            // If the target is not a table cell, loop to its parent until it's a table cell
            var parentElement = target.parentElement;
            while (parentElement && parentElement.tagName !== "TR") {
                parentElement = parentElement.parentElement;
            }
            // If the parent is a table cell, remove it and remove the time from the times array
            if (parentElement && parentElement.tagName === "TR") {
                //the first row is day&time, should not be removed
                if (parentElement.id === "doNotRemove") {
                    const conflict = document.getElementById('timeqoute');
                    conflict.innerHTML = "“Time will not slow down when you were trying to delete it” – Developer";
                } else {
                    //remove the element
                    parentElement.remove();
                    const dataInfo = parentElement.getAttribute('data-info');
                    console.log(dataInfo);
                    //remove the time from the times array
                    const time = timetableData[dataInfo].time.toString();
                    for (let i = 0; i < times.length; i++) {
                        if (time === times[i].toString()) {
                            times.splice(i, 1);
                            break;
                        }
                    }
                    const result = sortAndCheckTimeConflicts(times);
                    const conflict = document.getElementById('error');

                    if (result.hasConflict) {
                        conflict.innerHTML = "<p>There is a time conflict</p>";
                    } else {
                        conflict.innerHTML = '';
                    }
                    //remove from cookie
                    let cookie = getCookie("cookie");
                    const cookieArray = cookie.split(",");
                    for (let i = 1; i < cookieArray.length; i++) {
                        if (cookieArray[i] === dataInfo) {
                            cookieArray.splice(i, 1);
                            setCookie("cookie", cookieArray.toString(), 7);
                            break;
                        }
                    }
                }
            }
        });
        contextMenu.children.item(1).addEventListener("click", function () {
            // if there is a menu, remove it and set hasMenu to false
            if (document.getElementById("rightClickDelete") !== null) {
                document.getElementById("rightClickDelete").remove();
            }
            hasMenu = false;
            // If the target is not a table cell, loop to its parent until it's a table cell
            let parentElement = target.parentElement;
            while (parentElement && parentElement.tagName !== "TR") {
                parentElement = parentElement.parentElement;
            }
            // If the parent is a table cell, remove it and remove the time from the times array
            if (parentElement && parentElement.tagName === "TR") {
                //the first row is day&time, should not be removed
                if (parentElement.id === "doNotRemove") {
                    const conflict = document.getElementById('timeqoute');
                    conflict.innerHTML = "“Time will not slow down when you were trying to delete it” – Developer";
                } else {
                    //remove this element
                    if(target.tagName === "TD"){
                        target.innerHTML = "";
                    }
                    else {
                        let thisElement = target.parentElement;
                        while (thisElement && thisElement.tagName !== "TD") {
                            thisElement = thisElement.parentElement;
                        }
                        thisElement.innerHTML = "";
                    }
                }
            }
        });
        if (hasMenu) {
            // delete the menu if it exists when click on the same place
            if (document.getElementById("rightClickDelete") !== null) {
                document.getElementById("rightClickDelete").remove();
            }
            // set the hasMenu to false, so that the menu will be created when click on the same place
            hasMenu = false;

        } else {
            if (e.button === 2) {
                // get the position of the mouse
                contextMenu.appendChild(menuItemDeleteAll);
                // add the menu item to the menu
                document.body.appendChild(contextMenu);
                //set the position of the menu
                contextMenu.style.left = (e.clientX + window.scrollX) + "px";
                contextMenu.style.top = (e.clientY + window.scrollY) + "px";
                //set the hasMenu to true, so that the menu will be deleted when click on the same place
                hasMenu = true;

            }
        }

    }

});
document.addEventListener("mousemove", function (e) {
    const target = e.target;
    if (target.innerHTML.trim() !== "" && !hasZoomedIn && !hasMenu) {
        var parentElement = target.parentElement;
        while (parentElement && parentElement.tagName !== "TR") {
            parentElement = parentElement.parentElement;
        }
        if (parentElement && parentElement.tagName === "TR") {
            parentElement.style.cursor = 'pointer';
        }
    }

});
// An event listener for the zoom in function
document.addEventListener("click", function (e) {
    // Set the target to the clicked element
    const target = e.target;
    // If the target has context and zoomed in is not applied and there is no menu
    if (target.innerHTML.trim() !== "" && !hasZoomedIn && !hasMenu) {
        // If the target is not a table cell, loop to its parent until it's a table cell
        var parentElement = target.parentElement;
        while (parentElement && parentElement.tagName !== "TR") {
            parentElement = parentElement.parentElement;
        }
        if (parentElement && parentElement.tagName === "TR") {
            //the first row is day&time, should not be zoomed in
            if (parentElement.id !== "doNotRemove") {
                // get the data-info attribute of the parent element
                let dataInfo = parentElement.getAttribute('data-info');
                dataInfo = timetableData[dataInfo];
                // set the all needed data to the zoom in table
                const zoomInTable = document.createElement('table');
                zoomInTable.className = "zoomInTable";
                zoomInTable.id = "zoomInTable";
                const zoomIn = document.createElement('tr');
                zoomIn.className = "zoomIn";
                const timeTd = document.createElement('td');
                //add the time to the zoom in table
                addInto(timeTd, dataInfo)
                // append the time to the zoom in table
                zoomIn.appendChild(timeTd);
                zoomInTable.appendChild(zoomIn);
                document.getElementById("zoomWindowDiv").appendChild(zoomInTable);
                blurEverything("zoomWindowDiv");
                // set the hasZoomedIn to true, so that the zoom in table will be deleted when click on the same place
                hasZoomedIn = true;
            }
        }
    } else {
        //if the target is not a table cell and there is a zoom in table, delete the zoom in table
        if (document.getElementById("zoomInTable") !== null) {
            document.getElementById("zoomInTable").remove();
        }
        hasZoomedIn = false;
        removeBlur();
    }
    //if the target is a table cell and there is a zoom in table, delete the zoom in table
    if (document.getElementById("rightClickDelete") !== null) {
        document.getElementById("rightClickDelete").remove();
    }
    hasMenu = false;
});
// The save as pdf function


window.jsPDF = window.jspdf.jsPDF;
const docPDF = new jsPDF();

function print() {
    if (document.getElementById("rightClickDelete") !== null) {
        document.getElementById("rightClickDelete").remove();
    }
    if (document.getElementById("zoomInTable") !== null) {
        document.getElementById("zoomInTable").remove();
    }
    const elementHTML = document.querySelector("#saveAsPDF");
    const options = {
        background: "black",
        scale: 2,
        useCORS: true,
        width: 800,
        callback: function (docPDF) {
            docPDF.save('TimeTable.pdf');
        },
        x: 15,
        y: 15
    };
    docPDF.html(elementHTML, options);

}


function blurEverything(exception) {
    // Get all the immediate child elements of the body element except the exception
    const elements = document.querySelectorAll(`body > :not(#${exception}):not(script):not(style)`);

    // Add a blur style to each element
    elements.forEach(element => {
        element.style.filter = "blur(5px)";
    });
}

function removeBlur() {
    const elements = document.querySelectorAll("body > *");

    // Remove the filter style from all elements
    elements.forEach(element => {
        element.style.filter = "none";
    });
}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cookie1) {
    let name = cookie1 + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

