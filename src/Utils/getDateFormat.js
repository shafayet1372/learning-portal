const monthsNameFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDateFormate = (createdAt) => {
    let date = new Date(createdAt)
    return `${date.getDate()} ${monthsNameFull[date.getMonth()]} ${date.getFullYear()} ${date.toLocaleTimeString()}`
}