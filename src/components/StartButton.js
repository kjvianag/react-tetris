import React from "react";
import { styledStartButton } from "./styles/StyledStartButton";

const StarButton = ({ callback }) => (
    <styledStartButton onclick={callback}>Star Game</styledStartButton>
)

export default StarButton;