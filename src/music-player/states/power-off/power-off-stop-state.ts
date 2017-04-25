import { PlayerStateContext, IPlayerState } from "../../player-state-context";

export class PowerOffStopState implements IPlayerState {
  context: PlayerStateContext;

  constructor(playerStateContext: PlayerStateContext) {
    this.context = playerStateContext;
  }

  playClicked = () => {
    this.context.setState("Play");
    this.context.execute();
  }
  pauseClicked = () => {
    this.context.setState("Pause");
    this.context.execute();
  }
  stopClicked = () => {
    this.context.setStatus("cannot stop, power is off");
  }
  execute = () => {
    this.context.onStop();
  }
}