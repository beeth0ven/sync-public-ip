import { TestScheduler } from 'rxjs/testing'
import { throttleTime } from 'rxjs/operators';

const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
})

it('gnerate the stream correctly', () => {
    scheduler.run(helpers => {
        const { cold, expectObservable, expectSubscriptions } = helpers
        const e1 =   cold('-a--b--c---|')
        const subs =      '^----------!'
        const expected =  '-a-----c--|'

        expectObservable(e1.pipe(throttleTime(3, scheduler))).toBe(expected)
        expectSubscriptions(e1.subscriptions).toBe(subs)
    })
})
