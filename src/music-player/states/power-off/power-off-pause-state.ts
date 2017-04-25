import { PlayerStateContext, IPlayerState } from "../../player-state-context";

export class PowerOffPauseState implements IPlayerState {
    context: PlayerStateContext;

    constructor(playerStateContext: PlayerStateContext) {
        this.context = playerStateContext;
    }

    playClicked = () => {
        this.context.setState("Play");
        this.context.execute();
    }
    pauseClicked = () => {
        this.context.setStatus("cannot paused, power if off");
    }
    stopClicked = () => {
        this.context.setState("Stop");
        this.context.execute();
    }
    execute = () => {
        this.context.onPause();
    }
}