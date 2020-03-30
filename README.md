# LTO Network Explorer

> Serverlesss Network Explorer built for the LTO Network powered by multiple API services.

https://ltonetwork.github.io/lto-network-explorer/dashboard/

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## .env

```
BASE_ROUTE=/explorer/
LB_API=https://nodes.lto.network
CACHE_API=https://api.lto.cloud/v1
NETWORK_API=https://network.lto.cloud/v1
BRIDGE_API=https://bridge.lto.network
STATS_API=https://stats.lto.network
LATEST_BLOCKS=10
AXIOS_TIMEOUT=20000
ATOMIC=100000000
```
