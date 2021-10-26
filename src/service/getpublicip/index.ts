import { Observable } from 'rxjs';
import * as https from "https";
import axios from 'axios';

export function getPublicIp(): Observable<string> {
  return new Observable<string>((observer) => {
    axios.post(process.env.LINK_SYS_ENDPOINT!, {}, {
      headers: {
        'X-JNAP-Action': 'http://linksys.com/jnap/router/GetWANStatus',
        'X-JNAP-Authorization': process.env.LINK_SYS_AUTHORIZATION,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      const ip = response.data.output.wanConnection.ipAddress as string;
      observer.next(ip);
      observer.complete();
    }).catch((error) => {
      observer.error(error);
    })
  })
}

export function getPublicIpFromAWS(): Observable<string> {
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