const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
}

export const formatDate = (date: string) => {
    let dateToFormat = new Date(date);
    let today = new Date();

    
    let year = dateToFormat.getFullYear();
    let month = addLeadingZero(dateToFormat.getMonth() + 1);
    let day = addLeadingZero(dateToFormat.getDate());
    let hour = addLeadingZero(dateToFormat.getHours());
    let minute = addLeadingZero(dateToFormat.getMinutes());

    if (
        dateToFormat.getDate() === today.getDate() &&
        dateToFormat.getMonth() === today.getMonth() &&
        dateToFormat.getFullYear() === today.getFullYear()
    ) {
        return `Hari ini ${hour}:${minute}`;
    }

    return `${day}-${month}-${year} ${hour}:${minute}`;
}