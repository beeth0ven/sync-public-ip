
export function logBeauty(value: any) {
    console.log(JSON.stringify(value, null, 4))
}

export function logWithTime(value: any) {
    console.log(`${value}  ${new Date()}`)
}