import { PlayerStateContext, IPlayerState } from "../../player-state-context";

export class PowerOnStopState implements IPlayerState {
  context: PlayerStateContext;

  constructor(playerStateContext: PlayerStateContext) {
    this.context = playerStateContext;
  }

  playClicked = () => {
    this.context.setState("Play");
    this.context.execute();
  }
  pauseClicked = () => {
    this.context.setStatus("can't pause. need to play first");
  }
  stopClicked = () => {
    if (this.context.isStateExecuting) {
      this.context.setStatus("already stopped...");
    } else {
      this.context.setStatus("stopping player...");
    }
  }
  execute = () => {
    this.context.onStop();
  }
}