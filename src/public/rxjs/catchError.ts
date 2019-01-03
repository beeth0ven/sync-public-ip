import { catchError } from "rxjs/operators";
import { Observable, OperatorFunction, of } from "rxjs";

export function catchErrorReturnJust<T, R>(
    selector: (err: any, caught: Observable<T>) => R
    ): OperatorFunction<T, T | R> {
    return catchError((error, caught) => of(selector(error, caught)))
}
