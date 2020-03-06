import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton"

export const Buttons = () => {
    const StartButton = ({ callback }) => (
        <StyledStartButton onClick={callback}>Star Game</StyledStartButton>
    );

    const ResetButton = ({ callback }) => (
        <StyledStartButton onClick={callback}>Reset</StyledStartButton>
    );
    return [StartButton, ResetButton];
};