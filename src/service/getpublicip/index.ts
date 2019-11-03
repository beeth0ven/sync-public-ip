import { Observable } from 'rxjs';
import * as https from "https";

export function getPublicIp(): Observable<string> {
  return new Observable<string>((observer) => {
    https.get('https://6qqgxhqhib.execute-api.ap-northeast-2.amazonaws.com/production/get-public-ip', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        observer.next(data);
        observer.complete();
      })

    }).on('error', (error) => {
      observer.error(error)
    })
  })
}