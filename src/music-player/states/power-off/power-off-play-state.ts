import { PlayerStateContext, IPlayerState } from "../../player-state-context";

export class PowerOffPlayState implements IPlayerState {
    context: PlayerStateContext;
    
    constructor(playerStateContext: PlayerStateContext) {
        this.context = playerStateContext;
    }

    playClicked = () => {
        this.context.setStatus("cannot play, power is off");
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