import { Observable } from 'rxjs';
import * as https from "https";
import axios from 'axios';
import { LinkSysApis, LinkSysSessionApis } from 'link-sys-api';

export function getPublicIpFromLinkSysSession(): Observable<string> {
  const apis = new LinkSysSessionApis(
    axios,
    process.env.LINK_SYS_SESSION_ENDPOINT!,
    process.env.LINK_SYS_USERNAME!,
    process.env.LINK_SYS_PASSWORD!
  );
  return new Observable<string>((observer) => {
    apis.wanInfo()
      .then((response) => {
        const ip = response.data.InternetConnection.IPv4.IP as string;
        observer.next(ip);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
  });
}

export function getPublicIpFromLinkSys(): Observable<string> {
  const apis = new LinkSysApis(
    axios,
    process.env.LINK_SYS_ENDPOINT!,
    process.env.LINK_SYS_AUTHORIZATION!,
  );
  return new Observable<string>((observer) => {
    apis.getWanStatus()
      .then((response) => {
        const ip = response.data.output.wanConnection.ipAddress as string;
        observer.next(ip);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
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