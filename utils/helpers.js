const { formatDistance } = require('date-fns') 

module.exports = {
  format_date: (date) => {
    return formatDistance( date, new Date(), {addSuffix: true})
  }
}
