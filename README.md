# LTO Network Explorer

> Serverlesss Network Explorer built for the LTO Network powered by multiple API services.

https://explorer.lto.network

## Build Setup

``` bash
# install dependencies
$ npm install

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
CACHE_API=https://stats.ltonetwork.com/v1
BRIDGE_API=https://bridge.lto.network
LATEST_BLOCKS=10
AXIOS_TIMEOUT=20000
ATOMIC=100000000
```
