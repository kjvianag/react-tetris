import React, { useState } from "react";

import { createStage, checkColision } from "../gameHelpers";

// styled components
import { StyledTetrisWrapper, StyledTetris, TitleGame } from "./styles/StyledTetris";

//custom hooks
import { useInteral } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

//Components
import Stage from './Stage';
import Display from './Display';
import { Buttons } from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
    const [StartButton, ResetButton] = Buttons();

    const movePlayer = dir => {
        if (!checkColision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const resetGame = () => {
        startGame();
    }

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkColision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInteral(() => {
        drop();
    }, dropTime)

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <TitleGame>REACT - TETRIS</TitleGame>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over!" />
                    ) : (
                            <div>
                                <Display text={`Score : ${score}`} />
                                <Display text={`Rows : ${rows}`} />
                                <Display text={`Level : ${level}`} />
                            </div>
                        )}
                    <StartButton callback={startGame} />
                    <ResetButton callback={resetGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};

export default Tetris;
