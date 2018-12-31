import { Observable } from "rxjs";

export type UpdateIp = (ip: string) => Observable<string>
