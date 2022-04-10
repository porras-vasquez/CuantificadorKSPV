const xlsx = require('xlsx');
const xlsx = require('path');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook=xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportComToExcel = (companies, workSheetColumnNames, workSheetName, filePath) => {
    const data= companies.map(companies => {
        return [];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}
module.exports = exportComToExcel;