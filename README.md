# react-coinhive

Mine cryptocurrency in your browser. This uses [Coin-Hive](https://coin-hive.com/) to mine [Monero (XMR)](https://getmonero.org/).

## Installation

```
npm install --save react-coinhive
```

## Usage

```jsx
import React from 'react';
import CoinHive from 'react-coinhive';

export default MyClass extends React.Component {
  render() {
    return (
      <CoinHive
        userName="Maya"
        siteKey="caP8U8pZXH6n0f53eV3fdpwOvpmTAD3C"
        autoThreads={false}
        threads={2}
        onInit={miner => setInterval(
          () => console.log(CoinHive.getMinerData(miner))
          , 1000
        )}
      />
    )
  }
}
```

## Props

- `siteKey`: Your [Coin-Hive Site Key](https://coin-hive.com/settings/sites).

- `userName`: If used, the miner will be created with `CoinHive.User(siteKey, userName)`. By default the miner is created with `CoinHive.Anonymous(siteKey)`.

- `threads`: The number of threads the miner should start with. Default is `2`.

- `throttle`: The fraction of time that threads should be idle. Default is `0`.

- `onInit`: A function that takes the `miner` instance as argument. It's called when the miner is created.

- `onStart`: A function that takes the `miner` instance as argument. It's called every time the miner is started.

- `onStop`: A function that takes the `miner` instance as argument. It's called every time the miner is stopped.

## Disclaimer

I have nothing to do with `coin-hive.com`.
