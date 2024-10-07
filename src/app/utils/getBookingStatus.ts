const getBookingStatus = (startDate: Date, endDate: Date) => {
    const today = new Date()
    if (today < new Date(startDate)) {
      return 'upcoming'
    }
    if (today > new Date(endDate)) {
      return 'completed'
    }
    if( today >= new Date(startDate) && today <= new Date(endDate)){
      return 'active'
    }
    return
}

export default getBookingStatus;