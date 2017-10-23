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
        src={CoinHive.src.authedmine}
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

- `src` : Source url of the js script minier. Requires a string. Default is `CoinHiveClient.src.coinhive` ('https://coinhive.com/lib/coinhive.min.js')
  Available default values :
  ```javascript
    CoinHiveClient.src = {
      coinhive: 'https://coinhive.com/lib/coinhive.min.js',
      authedmine : 'https://authedmine.com/lib/authedmine.min.js',
    };
  ```

- `threads`: The number of threads the miner should start with. Default is `2`.

- `throttle`: The fraction of time that threads should be idle. Default is `0`.

- `onInit`: A function that takes the `miner` instance as argument. It's called when the miner is created.

- `onStart`: A function that takes the `miner` instance as argument. It's called every time the miner is started.

- `onStop`: A function that takes the `miner` instance as argument. It's called every time the miner is stopped.

## Shortlink

### Storytime!

It's not always enough just to mine in the browser. 
Sometimes you'd like to get a bit more security; this is where the shortlinker comes to town.

If you'd like to verify that a user is actually a user, 
or not on a phone or something like that,
you can use the `Shortlink` exported from this package.

### Usage

It's quite simple to use, simply import `{ Shortlink }` from `react-coinhive`,
provide your secret site key and call the curried function, simple as that!

#### Example

```jsx harmony
import { Shortlink } from 'react-coinhive';

(async () => {
    const linker = Shortlink(SECRET);
    
    console.log(await linker('http://mcordes.me/'));
})
```

But, what do you do if you're on a dev-server?
Well It's quite simple as well,

```jsx harmony
import { Shortlink } from 'react-coinhive';

(async () => {
    const linker = Shortlink(SECRET, true);
    
    console.log(await linker('http://mcordes.me/'));
})
```

BAM! It's now working! 
(It'll be using [cors-anywhere](https://cors-anywhere.herokuapp.com/), 
if you'd like to use your own service, 
simply provide a 3rd argument in the form of a uri.)

## Disclaimer

I have nothing to do with `coin-hive.com`.