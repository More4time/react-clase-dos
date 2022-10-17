import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./TicTacToe.css";
import FancyButton from "../small/FancyButton";

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.
  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }
  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={value || onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", ""]),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {winner === 'empate' ? "Empate!" : `Gana el jugador ${winner}!`}
      </span>
      <FancyButton onClick={onRestart}>Jugar nuevamente?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(["X", "O"]),
  onRestart: PropTypes.func,
};

const getWinner = (tiles) => {

  let win = "";
  const winConf = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const arrX = [];
  const arrO = [];
  tiles.forEach((elem, index) => {
    if (elem === "X") {
      arrX.push(index);
    } else if (elem === "O") {
      arrO.push(index);
    }
  });

  winConf.some(function(elem) {
    if (
      arrX.includes(elem[0]) &&
      arrX.includes(elem[1]) &&
      arrX.includes(elem[2])
    ) {
      win = "X";
    }
    if (
      arrO.includes(elem[0]) &&
      arrO.includes(elem[1]) &&
      arrO.includes(elem[2])
    ) {
      win = "O";
    }
    return null;
  });
  if (arrX.length === 5 && win === "") {
    win = "empate";
  }
  return win;
};

const useTicTacToeGameState = () => {
  const [tiles, setTiles] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const winner = getWinner(tiles);
  let gameEnded = false;

  winner && (gameEnded = true);

  const setTileTo = (tileIndex, player) => {
    /*
    No se porque no puedo hacer: { setTiles([...tiles], tiles[tileIndex] = player); }
    dentro de la funcion cambia el elemento del array bien, pero al salir de la funcion aparece pusheado al final del array
    por eso use esto de abajo
    */
    const newTiles = [...tiles];
    newTiles[tileIndex] = player;
    setTiles(newTiles);
    cambiaPlayer();
  };

  const cambiaPlayer = () => {
    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };

  const restart = () => {
    setTiles(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
    gameEnded = false;
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState("X");

  return (
    <div className="tictactoe" id='tablero'>
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      <div className="tictactoe-row">
        <Square value={tiles[0]} onClick={() => setTileTo(0, currentPlayer)} />
        <Square value={tiles[1]} onClick={() => setTileTo(1, currentPlayer)} />
        <Square value={tiles[2]} onClick={() => setTileTo(2, currentPlayer)} />
      </div>
      <div className="tictactoe-row">
        <Square value={tiles[3]} onClick={() => setTileTo(3, currentPlayer)} />
        <Square value={tiles[4]} onClick={() => setTileTo(4, currentPlayer)} />
        <Square value={tiles[5]} onClick={() => setTileTo(5, currentPlayer)} />
      </div>
      <div className="tictactoe-row">
        <Square value={tiles[6]} onClick={() => setTileTo(6, currentPlayer)} />
        <Square value={tiles[7]} onClick={() => setTileTo(7, currentPlayer)} />
        <Square value={tiles[8]} onClick={() => setTileTo(8, currentPlayer)} />
      </div>
    </div>
  );
};
export default TicTacToe;