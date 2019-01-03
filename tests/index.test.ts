import { TestScheduler } from 'rxjs/testing'
import { of } from 'rxjs';
import { Main } from '../src/state/Main';

const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
})

it('test the main system', () => {
    scheduler.run(helpers => {
        const { cold, expectObservable } = helpers
        
        const mutations =   cold('------m---', { m: Main.Mutation.onTriggerGetPublicIp() })
        const expected =        ['(abc)-(de)', {
            a: {
                domainIp: null,
                publicIp: null,
                publicIpError: null,
                triggerGetPublicIp: true,
                updateDomainIpError: null,
                triggerUpdateDomainIp: false,
            },
            b: {
                domainIp: null,
                publicIp: '10.0.0.1',
                publicIpError: null,
                triggerGetPublicIp: false,
                updateDomainIpError: null,
                triggerUpdateDomainIp: true,
            },
            c: {
                domainIp: '10.0.0.1',
                publicIp: '10.0.0.1',
                publicIpError: null,
                triggerGetPublicIp: false,
                updateDomainIpError: null,
                triggerUpdateDomainIp: false,
            },
            d: {
                domainIp: '10.0.0.1',
                publicIp: null,
                publicIpError: null,
                triggerGetPublicIp: true,
                updateDomainIpError: null,
                triggerUpdateDomainIp: false,
            },
            e: {
                domainIp: '10.0.0.1',
                publicIp: '10.0.0.1',
                publicIpError: null,
                triggerGetPublicIp: false,
                updateDomainIpError: null,
                triggerUpdateDomainIp: false,
            },
        }]

        const states = Main.rxSystem(
            () => of('10.0.0.1'),
            ip => of(ip),
            [
                () => mutations,
            ]
        )

        expectObservable(states).toBe(expected[0] as string, expected[1])
    })
})
