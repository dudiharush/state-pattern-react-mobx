import { observer } from "mobx-react";
import * as React from "React";
import { PlayerStateContext } from "./player-state-context";
import './player.css';

@observer
export class Player extends React.Component<{ playerStateContext?: PlayerStateContext }, {}> {

    render() {
        let { playerStateContext } = this.props;
        return (
            <div>

                <div>
                    <button onClick={playerStateContext.onStop}>stop</button>
                    <button onClick={playerStateContext.onPause}>pause</button>
                    <button onClick={playerStateContext.onPlay}>play</button>
                    <span>in state: {playerStateContext.caption}</span>
                </div>
                <div>
                    <button onClick={playerStateContext.togglePower}>toggle Power</button>
                    <span>power is: {playerStateContext.power}</span>
                </div>
                <div>
                    <span>status:</span><span>{playerStateContext.status}</span>
                </div>
            </div>
        );
    }
}