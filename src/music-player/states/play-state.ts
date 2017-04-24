import { PlayerStateContext, IPlayerState } from "../player-state-context";

export class PlayState implements IPlayerState {
    private context: PlayerStateContext;
    
    constructor(playerStateContext: PlayerStateContext) {
        this.context = playerStateContext;
    }

    playClicked = () => {
        if (this.context.isStateExecuting) {
            this.context.setStatus("already playing...");
        } else {
            this.context.setStatus("playing started...");
        }
    }
    pauseClicked = () => {
        this.context.setState("Pause");
        this.context.execute();
    }
    stopClicked = () => {
        this.context.setState("Stop");
        this.context.execute();
    }
    execute = () => {
        this.context.onPlay();
    }
}