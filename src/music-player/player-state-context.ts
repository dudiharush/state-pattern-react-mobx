import { PlayState } from "./states/play-state";
import { StopState } from "./states/stop-state";
import { PauseState } from "./states/pause-state";
import { observable, computed, action } from "mobx/lib/mobx";

interface ICommand {
    execute: (playerStateContext: PlayerStateContext) => void
}

export interface IPlayerState extends ICommand {
    playClicked: (playerStateContext: PlayerStateContext) => void,
    pauseClicked: (playerStateContext: PlayerStateContext) => void,
    stopClicked: (playerStateContext: PlayerStateContext) => void,
}


type PlayerState = "Play" | "Stop" | "Pause";

export class PlayerStateContext {
    @observable private playerState: PlayerState;
    @observable private isPlayerStateExecuting: boolean;
    @observable private statusMessage: string;
    private playerStates: { [id: string]: IPlayerState };

    constructor() {
        this.playerStates = {
            "Play": new PlayState(this),
            "Stop": new StopState(this),
            "Pause": new PauseState(this)
        }

        this.setState("Stop")
        this.execute();
    }

    setState = (playerState: PlayerState) => {
        this.playerState = playerState;
        this.isPlayerStateExecuting = false;
    }

    onPause = () => {
        this.executeStateAction(this.currentState().pauseClicked)
    }
    onPlay = () => {
        this.executeStateAction(this.currentState().playClicked);
    }
    onStop = () => {
        this.executeStateAction(this.currentState().stopClicked)
    }
    execute = () => {
        this.executeStateAction(this.currentState().execute)
    };

    private executeStateAction(stateFunctionToExecute: { (context: PlayerStateContext): void }) {
        stateFunctionToExecute(this);
        this.isPlayerStateExecuting = true;
    }

    @computed
    get caption() {
        return this.playerState;
    }

    @computed
    get status() {
        return this.statusMessage;
    }

    @computed
    get isStateExecuting() {
        return this.isPlayerStateExecuting;
    }

    @action setStatus(statusMessage: string) {
        this.statusMessage = statusMessage;
    }

    currentState = () => {
        return this.playerStates[this.playerState];
    }
}