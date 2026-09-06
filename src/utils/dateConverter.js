export default function dateConverter(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const splitString = date.split('-');

  const year = splitString[0];
  const month = months[splitString[1] - 1];
  const day = splitString[2];
  
  const convertedDate = `${day} ${month} ${year}`;

  const dateObject = {
    year,
    convertedDate
  }

  return dateObject;
}
