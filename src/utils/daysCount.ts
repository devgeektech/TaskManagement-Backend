import moment = require("moment");

export const noOfDays = (value: any) => {
    let objectDate = new Date();
    var a = moment(value, 'DD/MM/YYYY');
    var b = moment(objectDate, 'DD/MM/YYYY');
    var days = a.diff(b, 'days');
    return days
};

export const noOfDays1 = (value: any) => {
    let date = new Date();
    let currentDate = date.toLocaleDateString();
    var date1 = moment(value, "DD-MM-YYYY");
    var date2 = moment(currentDate, "DD-MM-YYYY");
    var months = date2.diff(date1, "months");
    date1.add(months, "months");
    var days = date1.diff(date2, "days");
    return days;
};