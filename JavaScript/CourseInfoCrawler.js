// Define an object containing the timetable data


const puppeteer = require('puppeteer');
const fs = require('fs');

async function launchPuppeteerSpring() {
    let inputData = ['Class Info'];
    let department = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/spring2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];
        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];
        const professor = inputData[6 + i];
        const crn = inputData[7 + i];
        const gened = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        department += courseName + "\", \"";
        // Add the course to the timetableData object
        timetableData[courseCode] = {
            subject: subject,
            courseCode: courseCode,
            courseName: courseName,
            credits: credits,
            time: time,
            professor: professor,
            crn: crn,
            gened: gened,
            prior: prior,
            specialInfo: specialInfo
        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataSpring.js', `export const timetableDataSpring = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataSpring.js', `export const courseNameStringsSpring = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataSpring.js', `export const courseNameToCodeSpring = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
async function launchPuppeteerSummer() {
    let inputData = ['Class Info'];
    let department = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/summer2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];
        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];
        const professor = inputData[6 + i];
        const crn = inputData[7 + i];
        const gened = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        department += courseName + "\", \"";
        // Add the course to the timetableData object
        timetableData[courseCode] = {
            subject: subject,
            courseCode: courseCode,
            courseName: courseName,
            credits: credits,
            time: time,
            professor: professor,
            crn: crn,
            gened: gened,
            prior: prior,
            specialInfo: specialInfo
        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataSummer.js', `export const timetableDataSummer = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataSummer.js', `export const courseNameStringsSummer = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataSummer.js', `export const courseNameToCodeSummer = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
async function launchPuppeteerFall() {
    let inputData = ['Class Info'];
    let department = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/fall2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];
        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];
        const professor = inputData[6 + i];
        const crn = inputData[7 + i];
        const gened = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        department += courseName + "\", \"";
        // Add the course to the timetableData object
        timetableData[courseCode] = {
            subject: subject,
            courseCode: courseCode,
            courseName: courseName,
            credits: credits,
            time: time,
            professor: professor,
            crn: crn,
            gened: gened,
            prior: prior,
            specialInfo: specialInfo
        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataFall.js', `export const timetableDataFall = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataFall.js', `export const courseNameStringsFall = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataFall.js', `export const courseNameToCodeFall = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
launchPuppeteerSpring();
launchPuppeteerSummer();
launchPuppeteerFall();
function stringifyObject(obj) {
    let result = '{\n';

    for (const key in obj) {
        const value = obj[key];
        result += `  "${key}": {\n`;

        for (const innerKey in value) {
            const innerValue = JSON.stringify(value[innerKey]);
            result += `    ${innerKey}: ${innerValue},\n`;
        }

        result += '  },\n';
    }

    result += '}';
    return result;
}


