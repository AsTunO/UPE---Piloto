//encapsulates date conversion from epoch, for future general adjustments (eg timezone)
function epochToDate(epoch_date) {
    return new Date(+epoch_date * 1000); //moodle epoch is in seconds, no milliseconds   
}    

export default epochToDate;