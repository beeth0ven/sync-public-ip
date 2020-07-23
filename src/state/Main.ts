import { Observable } from "rxjs";
import { map, timeout } from "rxjs/operators";
import { FeedbackLoop, system, Feedbacks, defaultRetryStrategy } from "rxfeedback";
import { logWithTime, logBeauty } from "../public/logger";
import { UpdateIp } from "../internal/UpdateIp";
import { catchErrorReturnJust } from "../public/rxjs/catchError";

export namespace Main {

    export type State = {
        domainIp: string | null,
        publicIp: string | null,
        publicIpError: any | null,
        triggerGetPublicIp: boolean,

        updateDomainIpError: any | null,
        triggerUpdateDomainIp: boolean,
    }
 
    function publicIpQuery(state: State): void | null {
        return state.triggerGetPublicIp ? void 0 : null
    }

    function updateDomainIpQuery(state: State): string | null {
        return state.triggerUpdateDomainIp ? state.publicIp : null
    }

    export type Mutation =
        { kind: 'onTriggerGetPublicIp' } |
        { kind: 'onGetPublicIpSuccess', ip: string } |
        { kind: 'onGetPublicIpError', error: any } |
        { kind: 'onUpdateDomainIpSuccess', ip: string } |
        { kind: 'onUpdateDomainIpError', error: any }

    export namespace Mutation {
        export const onTriggerGetPublicIp = () => ({ kind: 'onTriggerGetPublicIp' } as Mutation)
        export const onGetPublicIpSuccess = (ip: string) => ({ kind: 'onGetPublicIpSuccess', ip } as Mutation)
        export const onGetPublicIpError = (error: any) => ({ kind: 'onGetPublicIpError', error } as Mutation)
        export const onUpdateDomainIpSuccess = (ip: string) => ({ kind: 'onUpdateDomainIpSuccess', ip } as Mutation)
        export const onUpdateDomainIpError = (error: any) => ({ kind: 'onUpdateDomainIpError', error } as Mutation)
    }

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
            case 'onTriggerGetPublicIp':
                return {
                    ...state,
                    triggerGetPublicIp: true,
                    publicIp: null,
                    publicIpError: null,
                }
            case 'onGetPublicIpSuccess':
                return {
                    ...state,
                    triggerGetPublicIp: false,
                    publicIp: mutation.ip,
                    publicIpError: null,

                    triggerUpdateDomainIp: mutation.ip != state.domainIp,
                    updateDomainIpError: null,
                }
            case 'onGetPublicIpError':
                return {
                    ...state,
                    triggerGetPublicIp: false,
                    publicIp: null,
                    publicIpError: mutation.error,
                }
            case 'onUpdateDomainIpSuccess':
                return {
                    ...state,
                    triggerUpdateDomainIp: false,
                    domainIp: mutation.ip,
                    updateDomainIpError: null,
                }
            case 'onUpdateDomainIpError':
                return {
                    ...state,
                    triggerUpdateDomainIp: false,
                    updateDomainIpError: mutation.error,
                }
        }
    }

    export function rxSystem(
        getPublicIp: () => Observable<string>,
        updateIp: UpdateIp,
        feedback: FeedbackLoop<State, Mutation>[]
    ): Observable<State> {
        const queryGetPublicIp: FeedbackLoop<State, Mutation> = Feedbacks.react(
            publicIpQuery,
            () => getPublicIp()
                .pipe(
                    timeout(30_000),
                    map(Mutation.onGetPublicIpSuccess),
                    catchErrorReturnJust(Mutation.onGetPublicIpError)
                )
            ,
            defaultRetryStrategy()
        )
        const queryUpdateRecordIp: FeedbackLoop<State, Mutation> = Feedbacks.react(
            updateDomainIpQuery,
            (query) => updateIp(query)
                .pipe(
                    timeout(30_000),
                    map(Mutation.onUpdateDomainIpSuccess),
                    catchErrorReturnJust(Mutation.onUpdateDomainIpError)
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

