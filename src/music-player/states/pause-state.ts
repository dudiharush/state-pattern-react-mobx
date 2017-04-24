import { PlayerStateContext, IPlayerState } from "../player-state-context";

export class PauseState implements IPlayerState {
    private context: PlayerStateContext;

    constructor(playerStateContext: PlayerStateContext) {
        this.context = playerStateContext;
    }

    playClicked = () => {
        this.context.setState("Play");
        this.context.execute();
    }
    pauseClicked = () => {
        if (this.context.isStateExecuting) {
            this.context.setStatus("already paused...");
        } else {
            this.context.setStatus("pausing player...");
        }
    }
    stopClicked = () => {
        this.context.setState("Stop");
        this.context.execute();
    }
    execute = () => {
        this.context.onPause();
    }
}