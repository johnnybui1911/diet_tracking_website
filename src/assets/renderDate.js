import moment from 'moment'

export const renderDate = user => {
  if (user) {
    switch (user.currentIndex) {
      case 0:
        return 'Today'
      case 1:
        return 'Yesterday'
      case 2:
        return moment(user.data_points[2].date).format('DD MMM')
      default:
        return 'Today'
    }
  } else {
    return 'Today'
  }
}
