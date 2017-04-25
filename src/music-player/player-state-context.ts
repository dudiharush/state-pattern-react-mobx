import { PowerOnPlayState } from "./states/power-on/power-on-play-state";
import { PowerOnStopState } from "./states/power-on/power-on-stop-state";
import { PowerOnPauseState } from "./states/power-on/power-on-pause-state";
import { observable, computed, action } from "mobx/lib/mobx";
import { PowerOffPlayState } from "./states/power-off/power-off-play-state";
import { PowerOffStopState } from "./states/power-off/power-off-stop-state";
import { PowerOffPauseState } from "./states/power-off/power-off-pause-state";

interface ICommand {
    execute: () => void
}

export interface IPlayerState extends ICommand {
    context: PlayerStateContext;
    playClicked: () => void,
    pauseClicked: () => void,
    stopClicked: () => void,
}

type PlayerState = "Play" | "Stop" | "Pause";
type PowerState = "On" | "Off";

export class PlayerStateContext {
    @observable private playerState: PlayerState;
    @observable private isPlayerStateExecuting: boolean;
    @observable private powerState: PowerState;
    @observable private statusMessage: string;
    private playerStates: { [powerState: string]: { [PlayerState: string]: IPlayerState } };

    constructor() {
        this.playerStates = {
            "On": {
                "Play": new PowerOnPlayState(this),
                "Stop": new PowerOnStopState(this),
                "Pause": new PowerOnPauseState(this)
            },
            "Off": {
                "Play": new PowerOffPlayState(this),
                "Stop": new PowerOffStopState(this),
                "Pause": new PowerOffPauseState(this)
            },

        }

        this.setState("Stop")
        this.powerState = "Off";
        this.execute();
    }

    @action
    togglePower = () => {
        if (this.powerState === "On") {
            this.powerState = "Off";
            this.isPlayerStateExecuting = false;
            this.setStatus("player power is off");
        } else {
            this.powerState = "On"
            this.currentState().execute();
        }
    }

    @action
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
        if (this.powerState === "On") {
            this.currentState().execute();
        }
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
    get power() {
        return this.powerState;
    }

    @computed
    get isStateExecuting() {
        return this.isPlayerStateExecuting;
    }

    @action setStatus(statusMessage: string) {
        this.statusMessage = statusMessage;
    }

    currentState = () => {
        return this.playerStates[this.powerState][this.playerState];
    }
}