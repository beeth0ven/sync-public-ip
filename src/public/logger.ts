import moment from 'moment';

export function logBeauty(value: any) {
    console.log(JSON.stringify(value, null, 4))
}

export function logWithTime(value: any) {
    console.log(`${value} ${dateText()}`)
}

function dateText(): string {
    return moment().locale('zh-cn').format('h:mm:ss a, MMMM Do YYYY')
}