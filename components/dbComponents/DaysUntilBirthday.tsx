// daysUntilNextBirthday receives month and day from the DB
// returns the days left for the birthday
export const daysUntilNextBirthday = (month, day) => {
  // Get current Year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  // Check if current year is a leap year only if date in DB is feb 29
  if (month == 2 && day == 29) {
    const leapYear = isLeapYear(currentYear);
    // Change to february 28 if not a leap year
    if (!leapYear) {
      month = 2;
      day = 28;
    }
  }
  // compare both dates
  // DB counts months from 1 to 12 but Date counts months from 0 to 11 so we need to substract 1
  const birthdayThisYear = new Date(currentYear, month - 1, day);
  const today = new Date(currentYear, currentMonth, currentDay);
  var daysLeft: number;
  if (today < birthdayThisYear) {
    daysLeft = (birthdayThisYear - today) / 86400000;
  } else if (+today === +birthdayThisYear) {
    daysLeft = 0;
  } else {
    // Make sure is not feb 29 in case current year is leap
    if (month === 2 && day === 29) {
      month = 2;
      day = 28;
    }
    const birthdayNextYear = new Date(currentYear + 1, month - 1, day);
    daysLeft = (birthdayNextYear - today) / 86400000;
  }
  return daysLeft;
};

function isLeapYear(currentYear) {
  var isLeap: Boolean;
  if (
    currentYear % 4 === 0 &&
    currentYear % 400 === 0 &&
    currentYear % 100 !== 0
  ) {
    isLeap = true;
  } else {
    isLeap = false;
  }
  return isLeap;
}
