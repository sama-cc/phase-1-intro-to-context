const createEmployeeRecord = (array) => {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],    
        };
    return employeeRecord;
}

          
const createEmployeeRecords = (array) => array.map(employee => createEmployeeRecord(employee))
          
const createTimeInEvent = (obj, date) => {
    let newArray = obj["timeInEvents"];
    newArray.push({
        type: "TimeIn",
        hour: parseInt(date.slice(11, date.length)),
        date: date.slice(0,10),
        })
    return obj;
}
          
const createTimeOutEvent = (obj, date) => {
    let newArray = obj["timeOutEvents"];
    newArray.push({
        type: "TimeOut",
        hour: parseInt(date.slice(11, date.length)),
        date: date.slice(0,10),
        })
    return obj;
}
          
const hoursWorkedOnDate = (obj, workDate) => {
    let timeIn = obj["timeInEvents"].find(date => date["date"] === workDate)["hour"];
    let timeOut = obj["timeOutEvents"].find(date => date["date"] === workDate)["hour"];
    return parseInt((timeOut - timeIn)/100);
}
          
const wagesEarnedOnDate = (obj, date) => hoursWorkedOnDate(obj, date)*obj["payPerHour"];
          
const allWagesFor = (obj) => {
    let dateArray = obj["timeInEvents"].map(workDate => workDate["date"]);
    let earnedArray = dateArray.map(date => wagesEarnedOnDate(obj, date));
    return earnedArray.reduce((accum, currentValue) => accum + currentValue);
}
          
const calculatePayroll = (array) => {
    let payroll = array.map(employee => allWagesFor(employee));
    return payroll.reduce((accum, currentValue) => accum + currentValue);
}
