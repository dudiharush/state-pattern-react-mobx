import { observer } from "mobx-react";
import * as React from "React";
import { PlayerStateContext } from "./player-state-context";

@observer
export class Player extends React.Component<{ playerStateContext?: PlayerStateContext }, {}> {

    render() {
        let { playerStateContext } = this.props;
        return (
            <div>
                player is now in state: {playerStateContext.caption}
                <div>
                    <button onClick={playerStateContext.onStop}>stop</button>
                    <button onClick={playerStateContext.onPause}>pause</button>
                    <button onClick={playerStateContext.onPlay}>play</button>
                </div>
                <div>
                    <span>status:</span><span>{playerStateContext.status}</span>
                </div>
            </div>
        );
    }
}