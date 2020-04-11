import Vue from 'vue'
import moment from 'moment'

Vue.filter('parseAtomic', function (amount: number): number {
  return ((amount || 0) / (process.env.ATOMIC as any)) || 0
})

Vue.filter('parseString', function (string: string): string {
  return ((string || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }))
})

Vue.filter('parseNumber', function (amount: number): string {
  return ((amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).replace(/[.]?[0]*$/, ''))
})

Vue.filter('parseTimeHour', function (timestamp: number): string {
  return moment(timestamp).format('HH:MM:ss')
})

Vue.filter('parseTime', function (timestamp: number): string {
  return moment(timestamp).format('DD-MM-YY HH:MM:ss')
})

Vue.filter('fromNow', function (timestamp: number): string {
  return moment(timestamp).fromNow()
})

Vue.filter('truncateString', function (str: string): string {
  if (str === null) {
    return ''
  }
  const strLen = str.length
  const frontLen = 12
  const backLen = 12
  const truncateStr = '...'

  if ((frontLen >= strLen) || (backLen >= strLen) || (frontLen + backLen >= strLen)) {
    return str
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
  }
})
