# sync-public-ip
[![Build Status](https://travis-ci.org/beeth0ven/sync-public-ip.svg?branch=master)](https://travis-ci.org/beeth0ven/sync-public-ip)

Sync local machine's public ip with domain by using a dns service like: AWSRoute53 or Digital Ocean.


When local machine's public ip will change over time. This libary can be used to sync ip with domain.

## Usage:

* AWSRoute53:
  ```
  sudo docker run -d \
      -e PROVIDER=AWS \
      -e AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID \
      -e AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY \
      -e REGION=REGION \
      -e HOSTED_ZONE_ID=HOSTED_ZONE_ID \
      -e RECORD_NAME=RECORD_NAME \
      --restart always \
      --name sync-public-ip \
      beeth0ven/sync-public-ip
  ```

* Digital Ocean:
  ```
  sudo docker run -d \
    -e PROVIDER=DigitalOcean \
    -e DIGITALOCEAN_TOKEN=DIGITALOCEAN_TOKEN \
    -e DIGITALOCEAN_DOMAIN=DIGITALOCEAN_DOMAIN \
    -e DIGITALOCEAN_RECORD_ID=DIGITALOCEAN_RECORD_ID \
    --restart always \
    --name sync-public-ip \
    beeth0ven/sync-public-ip
  ```

## License

**sync-public-ip** is under MIT license. See the [LICENSE](LICENSE) file for more info.