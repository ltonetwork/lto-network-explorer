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
