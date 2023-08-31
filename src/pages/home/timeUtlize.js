

export function convertTimeToUTC(time) {
    const date = new Date(time);
    const utcDate = new Date(date.getTime()); 
    return utcDate;
  }
  
  export function convertTimeToMSD(time) {
    const date = new Date(time);
    const msdDate = new Date(date.getTime() - 480 * 60 * 1000);
    msdDate.setHours(msdDate.getHours() % 24);
  
    return msdDate;
  }

  
  export function convertToMSD(time) {
    const [hours, minutes] = time.split(':');
    let hoursNum = parseInt(hours, 10);
    let minutesNum = parseInt(minutes, 10);
  
    // Subtract 8 hours
    hoursNum -= 8;
  
    if (hoursNum < 0) {
      hoursNum += 24; // Handling negative hours (e.g., midnight cross-over)
    }
  
    // Convert back to 'HH:mm' format
    const msdTime = `${String(hoursNum).padStart(2, '0')}:${String(minutesNum).padStart(2, '0')}`;
    return msdTime;
  }

  export function convertDate(dateString) {
    const dateObject = dayjs(dateString);

  // Subtract 8 hours from the date
  const msdDate = dateObject.subtract(8, 'hour').toISOString();

  return msdDate;
  }
  
  
  
  
  
  