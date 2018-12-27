import { type } from "os";
import { Observable, of } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { FeedbackLoop, system, Feedbacks, defaultRetryStrategy } from "rxfeedback";
import { logWithTime, logBeauty } from "../public/logger";

export namespace UpdateIp {

    export type State = {
        domainIp: string | null,

        publicIp: string | null,
        publicIpError: string | null,
        triggerGetPublicIp: boolean,

        updateDomainIpError: string | null,
        triggerUpdateDomainIp: boolean,
    }

    function publicIpQuery(state: State): void | null {
        return state.triggerGetPublicIp ? void 0 : null
    }

    function updateDomainIpQuery(state: State): string | null {
        return state.triggerUpdateDomainIp ? state.publicIp : null
    }

    export type Mutation =
        { kind: 'OnTriggerGetPublicIp' } |
        { kind: 'OnGetPublicIpSuccess', ip: string } |
        { kind: 'OnGetPublicIpError', error: any } |
        { kind: 'OnUpdateDomainIpSuccess', ip: string } |
        { kind: 'OnUpdateDomainIpError', error: any }

    const initialState: State = {
        domainIp: null,
        publicIp: null,
        publicIpError: null,
        triggerGetPublicIp: true,
        updateDomainIpError: null,
        triggerUpdateDomainIp: false,
    }

    function reduce(state: State, mutation: Mutation): State {
        logWithTime('Mutation:')
        logBeauty(mutation)
        switch (mutation.kind) {
            case 'OnTriggerGetPublicIp':
                return {
                    ...state,
                    triggerGetPublicIp: true,
                    publicIp: null,
                    publicIpError: null,
                }
            case 'OnGetPublicIpSuccess':
                return {
                    ...state,
                    triggerGetPublicIp: false,
                    publicIp: mutation.ip,
                    publicIpError: null,

                    triggerUpdateDomainIp: mutation.ip != state.domainIp,
                    updateDomainIpError: null,
                }
            case 'OnGetPublicIpError':
                return {
                    ...state,
                    triggerGetPublicIp: false,
                    publicIp: null,
                    publicIpError: JSON.stringify(mutation.error, null),
                }
            case 'OnUpdateDomainIpSuccess':
                return {
                    ...state,
                    triggerUpdateDomainIp: false,
                    domainIp: mutation.ip,
                    updateDomainIpError: null,
                }
            case 'OnUpdateDomainIpError':
                return {
                    ...state,
                    triggerUpdateDomainIp: false,
                    updateDomainIpError: JSON.stringify(mutation.error, null),
                }
        }
    }

    export function rxSystem(
        getPublicIp: () => Observable<string>,
        updateRecordIp: (ip: string) => Observable<string>,
        feedback: FeedbackLoop<State, Mutation>[]
    ): Observable<State> {
        const queryGetPublicIp: FeedbackLoop<State, Mutation> = Feedbacks.react(
            publicIpQuery,
            () => getPublicIp()
                .pipe(
                    retry(3),
                    map((ip) => ({ kind: 'OnGetPublicIpSuccess', ip } as Mutation)),
                    catchError((error) => of({ kind: 'OnGetPublicIpError', error } as Mutation))
                )
            ,
            defaultRetryStrategy()
        )
        const queryUpdateRecordIp: FeedbackLoop<State, Mutation> = Feedbacks.react(
            updateDomainIpQuery,
            (query) => updateRecordIp(query)
                .pipe(
                    retry(3),
                    map((ip) => ({ kind: 'OnUpdateDomainIpSuccess', ip } as Mutation)),
                    catchError((error) => of({ kind: 'OnUpdateDomainIpError', error } as Mutation))
                )
            ,
            defaultRetryStrategy()
        )
        return system(
            initialState,
            reduce,
            feedback.concat(queryGetPublicIp, queryUpdateRecordIp)
        )
    }
}

