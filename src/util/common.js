import moment from 'moment'

class Common {
  static hash (str) {
    let hash = 5381
    let i = str.length

    while (i) {
      hash = (hash * 33) ^ str.charCodeAt(--i)
    }
    return hash >>> 0
  }

  static getDateStr (dateTime) {
    return moment(dateTime).format('YYYY-MM-DD')
  }

  static isNotBlank (value) {
    if (value && value.trim() !== '' && value !== 'null') {
      return true
    }
    return false
  }

  static isBlank (value) {
    if (value && value.trim() !== '' && value !== 'null') {
      return false
    }
    return true
  }

  static isNumber (value) {
    if (typeof value === 'number') {
      return true
    }
    return false
  }

  static isEmpty (arrs) {
    if (!arrs || arrs.length === 0) {
      return true
    }
    return false
  }

  static hasValue (arrs, value) {
    if (arrs && arrs.indexOf(value) >= 0) {
      return true
    }
    return false
  }
}

export default Common
