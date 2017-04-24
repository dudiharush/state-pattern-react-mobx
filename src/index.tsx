import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { Player } from './music-player/player';
import { PlayerStateContext } from "./music-player/player-state-context";

ReactDOM.render(<Player playerStateContext={new PlayerStateContext()} />, document.getElementById('example'));