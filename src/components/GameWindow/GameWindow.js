import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";

import { GameBoard, GameStatusBar } from "../index";
import { SocketContext } from "../../context/socket";

const GameBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  /* height: 90%; */
  border-right: 1px solid rgba(36, 39, 59, 0.6);
  padding: 1rem;
  @media screen and (max-width: 500px) {
    /* width: 100vw;
    height: 57%; */
    height: 90%;
    border-bottom: 1px solid rgba(36, 39, 59, 0.6);

  }
`;

export default function GameWindow({ userList, currentUser }) {
  const boardSize = 8;

  const [inGame, setInGame] = useState(false);
  const [board, setBoard] = useState(null);
  const [players, setPlayers] = useState(null);
  const [activePlayer, setActivePlayer] = useState("red");
  const [legalMoves, setLegalMoves] = useState(null);
  const [activePieceLoc, setActivePieceLoc] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [player, setPlayer] = useState("red");

  const ref = useRef(board);
  const activePlayerRef = useRef(activePlayer);
  const availableMovesRef = useRef(legalMoves);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("new board", (board, players, moves) => {
      setBoard(board);
      setPlayers(players);
      setPlayer("blue");
      setLegalMoves(moves);
    });
  }, []);

  useEffect(() => {
    socket.on("updated board", (board) => {
      console.log(board);
      setBoard(board.board.newboard);
      let tempPlayer = board.board.activePlayer;
      if (tempPlayer === "red") {
        setActivePlayer("blue");
        setPlayers(board.board.players);
        setLegalMoves(board.board.legalMoves);
        getAllLegalMoves("blue", board.board.newboard);
      } else {
        setActivePlayer("red");
        setPlayers(board.board.players);
        setLegalMoves(board.board.legalMoves);
        getAllLegalMoves("red", board.board.newboard);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('user disconnected', () => {
    alert('Opponent left the game.')
    // setInGame(false)
    setBoard(null)
    })
  }, [])

  const sendBoard = (newboard, legalMoves, activePlayer, players) => {
    socket.emit("updated board", {
      newboard,
      legalMoves,
      activePlayer,
      players,
    });
  };

  function updateState(newState) {
    ref.current = newState;
    setBoard(newState);
  }

  function updateActivePlayerState(newState) {
    activePlayerRef.current = newState;
    setActivePlayer(newState);
  }

  function updateAvailableMovesState(newState) {
    availableMovesRef.current = newState;
    setLegalMoves(newState);
  }

  const initBoard = (boardSize) => {
    const board = [];
    for (let col = 0; col < boardSize; col++) {
      let array = [];
      for (let row = 0; row < boardSize; row++) {
        let location = [row, col];
        array.push(createEmptyCell(location));
      }
      board.push(array);
    }
    return board;
  };

  const createEmptyCell = (location) => {
    let cell = {};

    cell.location = location;
    cell.piece = null;
    cell.available = false;

    return cell;
  };

  const initPlayers = (playerList) => {
    const playerRedPieces = [
      [0, 0],
      [2, 0],
      [4, 0],
      [6, 0],
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [0, 2],
      [2, 2],
      [4, 2],
      [6, 2],
    ];
    const playerBluePieces = [
      [1, 5],
      [3, 5],
      [5, 5],
      [7, 5],
      [0, 6],
      [2, 6],
      [4, 6],
      [6, 6],
      [1, 7],
      [3, 7],
      [5, 7],
      [7, 7],
    ];
    const players = [];
    const playerRed = createPlayer("red", playerRedPieces, playerList[0].id);
    const playerBlue = createPlayer("blue", playerBluePieces, playerList[1].id);
    playerRed.name = playerList[0].name;
    playerRed.id = playerList[0].id;
    players.push(playerRed);
    playerBlue.name = playerList[1].name;
    playerBlue.id = playerList[1].id;
    players.push(playerBlue);

    return players;
  };

  const createPlayer = (color, piecesList, id) => {
    let player = {};
    let pieces = [];
    piecesList.forEach((i) => {
      pieces.push(createPiece(color, id, i));
    });

    player.color = color;
    player.pieces = pieces;
    player.score = player.pieces.length;

    return player;
  };

  const createPiece = (color, id, location, isKing = false) => {
    let piece = {};
    piece.color = color;
    piece.isKing = isKing;
    piece.curLocation = location;
    piece.id = id;

    return piece;
  };

  const setPiecesOnBoard = (players, board) => {
    let newBoard = board;
    for (let col = 0; col < boardSize; col++) {
      for (let row = 0; row < boardSize; row++) {
        let location = [row, col];
        players.forEach((player) => {
          player.pieces.forEach((piece) => {
            if (
              piece.curLocation[0] === location[0] &&
              piece.curLocation[1] === location[1]
            ) {
              newBoard[col][row].piece = piece;
            }
          });
        });
      }
    }
    updateState(newBoard);
    return newBoard;
  };

  const getAllLegalMoves = (player, board) => {
    if (player !== "red" && player !== "blue") {
      return null;
    }
    let moves = [];

    console.log("board: ", board);
    console.log("player: ", player);

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        if (
          board[row][col].piece !== null &&
          board[row][col].piece.color === player
        ) {
          if (
            canJump(player, board, row, col, row + 1, col + 1, row + 2, col + 2)
          ) {
            moves.push(checkersMove(row, col, row + 2, col + 2));
          } else {
            if (canMove(player, board, row, col, row + 1, col + 1)) {
              moves.push(checkersMove(row, col, row + 1, col + 1));
            }
          }
          if (
            canJump(player, board, row, col, row - 1, col + 1, row - 2, col + 2)
          ) {
            moves.push(checkersMove(row, col, row - 2, col + 2));
          } else {
            if (canMove(player, board, row, col, row - 1, col + 1)) {
              moves.push(checkersMove(row, col, row - 1, col + 1));
            }
          }
          if (
            canJump(player, board, row, col, row + 1, col - 1, row + 2, col - 2)
          ) {
            moves.push(checkersMove(row, col, row + 2, col - 2));
          } else {
            if (canMove(player, board, row, col, row + 1, col - 1)) {
              moves.push(checkersMove(row, col, row + 1, col - 1));
            }
          }
          if (
            canJump(player, board, row, col, row - 1, col - 1, row - 2, col - 2)
          ) {
            moves.push(checkersMove(row, col, row - 2, col - 2));
          } else {
            if (canMove(player, board, row, col, row - 1, col - 1)) {
              moves.push(checkersMove(row, col, row - 1, col - 1));
            }
          }
        }
      }
    }

    if (moves.length === 0) {
      updateAvailableMovesState(null);
      return null;
    } else {
      //console.log("moves", moves);
      updateAvailableMovesState(moves);
    }
    return moves;
  };

  const canJump = (player, board, r1, c1, r2, c2, r3, c3) => {
    if (r3 < 0 || r3 >= 8 || c3 < 0 || c3 >= 8) {
      return false; //r3 and c3 are off of the board
    }
    if (board[r3][c3].piece) {
      return false; //r3,c3 already contains a piece
    }
    if (player === "red") {
      if (board[r1][c1].piece.color === "red" && board[r1][c1].piece.isKing) {
        if (!board[r2][c2].piece || board[r2][c2].piece.color === "red") {
          return false; // There is no black piece to jump.
        }
        return true;
      }
      if (board[r1][c1].piece.color === "red" && r3 < r1) return false; // Regular red piece can only move down.
      if (!board[r2][c2].piece || board[r2][c2].piece.color === "red")
        return false; // There is no black piece to jump.
      return true; // The jump is legal.
    } else {
      if (board[r1][c1].piece.color === "blue" && board[r1][c1].piece.isKing) {
        if (!board[r2][c2].piece || board[r2][c2].piece.color === "blue") {
          return false; // There is no red piece to jump.
        }
        return true;
      }
      if (board[r1][c1].piece.color === "blue" && r3 > r1) return false; // Regular black piece can only move up.
      if (!board[r2][c2].piece || board[r2][c2].piece.color === "blue")
        return false; // There is no red piece to jump.
      return true; // The jump is legal.
    }
  };

  const canMove = (player, board, r1, c1, r2, c2) => {
    if (r2 < 0 || r2 >= 8 || c2 < 0 || c2 >= 8) {
      return false; //r3 and c3 are off of the board
    }
    if (board[r2][c2].piece) {
      return false; //r3,c3 already contains a piece
    }
    if (player === "red") {
      if (board[r1][c1].piece.color === "red" && board[r1][c1].piece.isKing) {
        return true;
      }
      if (board[r1][c1].piece.color === "red" && r2 < r1) {
        return false; // Regular red piece can only move up.
      } else {
        return true; // The move is legal.
      }
    } else {
      if (board[r1][c1].piece.color === "blue" && board[r1][c1].piece.isKing) {
        return true;
      }
      if (board[r1][c1].piece.color === "blue" && r2 > r1) {
        return false; // Regular black piece can only move down.
      } else {
        return true; // The move is legal.
      }
    }
  };

  const checkersMove = (r1, c1, r2, c2) => {
    return {
      fromRow: r1,
      fromCol: c1,
      toRow: r2,
      toCol: c2,
    };
  };

  const showMoves = (board, row, col) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        board[row][col].available = false;
      }
    }

    legalMoves.forEach((move) => {
      if (move.fromRow === row && move.fromCol === col) {
        board[move.toRow][move.toCol].available = true;
      }
    });
  };

  const updatePieceLoc = (
    players,
    activePlayer,
    activePieceLoc,
    toLocation,
    kingStatus
  ) => {
    let copyOfPlayers = players;
    for (let player of copyOfPlayers) {
      if (player.color === activePlayer) {
        for (let piece of player.pieces) {
          if (
            piece.curLocation[0] === activePieceLoc[0] &&
            piece.curLocation[1] === activePieceLoc[1]
          ) {
            piece.curLocation = toLocation;
            piece.isKing = kingStatus;
          }
        }
      }
    }
    setPlayers(copyOfPlayers);
  };

  const removePiece = (players, activePlayer, opponentLocation) => {
    let copyOfPlayers = players;

    function filterByLocation(piece) {
      if (
        piece.curLocation[0] !== opponentLocation[0] ||
        piece.curLocation[1] !== opponentLocation[1]
      ) {
        return true;
      }
    }
    for (let player of copyOfPlayers) {
      // console.log("HOLD!!!!!!");
      if (player.color !== activePlayer) {
        let newArray = player.pieces.filter(filterByLocation);
        player.pieces = newArray;
        player.score -= 1;
      }
    }
    setPlayers(copyOfPlayers);
  };

  const jumpPiece = (
    players,
    toLocation,
    opponentLocation,
    board,
    kingStatus = false
  ) => {
    updatePieceLoc(
      players,
      activePlayer,
      activePieceLoc,
      toLocation,
      kingStatus
    );
    removePiece(players, activePlayer, opponentLocation);
    setPiecesOnBoard(players, initBoard(boardSize));
  };

  const movePiece = (toLocation, players) => {
    let boardArray = board;
    let updatedPlayers = players;
    let pieceStatus = null;
    let kingStatus = false;

    if (activePlayer === "red" && activePiece.piece.isKing) {
      pieceStatus = "RED_KING";
      kingStatus = true;
    } else if (activePlayer === "red") {
      pieceStatus = "RED";
    } else if (activePlayer === "blue" && activePiece.piece.isKing) {
      pieceStatus = "BLUE_KING";
      kingStatus = true;
    } else {
      pieceStatus = "BLUE";
    }

    switch (pieceStatus) {
      case "RED_KING":
        // console.log("RED_KING");
        if (isJump(activePieceLoc, toLocation)) {
          // console.log("JUMP move");
          let oppLoc = calcOpponentsLoc(activePieceLoc, toLocation);
          jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray, kingStatus);
        } else {
          console.log("Single Move");
          updatePieceLoc(
            players,
            activePlayer,
            activePieceLoc,
            toLocation,
            kingStatus
          );
          setPiecesOnBoard(players, initBoard(boardSize));
        }
        break;
      case "BLUE_KING":
        // console.log("BLUE_KING");
        if (isJump(activePieceLoc, toLocation)) {
          // console.log("JUMP move");
          let oppLoc = calcOpponentsLoc(activePieceLoc, toLocation);
          jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray, kingStatus);
        } else {
          console.log("Single Move");
          updatePieceLoc(
            players,
            activePlayer,
            activePieceLoc,
            toLocation,
            kingStatus
          );
          setPiecesOnBoard(players, initBoard(boardSize));
        }
        break;
      case "RED":
        // console.log("RED");
        if (isJump(activePieceLoc, toLocation)) {
          // console.log("JUMP move");
          let oppLoc = calcOpponentsLoc(activePieceLoc, toLocation);
          if (toLocation[1] === 7) {
            jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray, true);
          } else {
            jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray);
          }
        } else {
          // console.log("Single Move");
          if (toLocation[1] === 7) {
            updatePieceLoc(
              players,
              activePlayer,
              activePieceLoc,
              toLocation,
              true
            );
            setPiecesOnBoard(players, initBoard(boardSize));
          } else {
            updatePieceLoc(
              players,
              activePlayer,
              activePieceLoc,
              toLocation,
              kingStatus
            );
            setPiecesOnBoard(players, initBoard(boardSize));
          }
        }
        break;
      case "BLUE":
        // console.log("BLUE");
        if (isJump(activePieceLoc, toLocation)) {
          // console.log("JUMP move");
          let oppLoc = calcOpponentsLoc(activePieceLoc, toLocation);
          if (toLocation[1] === 0) {
            jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray, true);
          } else {
            jumpPiece(updatedPlayers, toLocation, oppLoc, boardArray);
          }
        } else {
          // console.log("Single Move");
          if (toLocation[1] === 0) {
            updatePieceLoc(
              players,
              activePlayer,
              activePieceLoc,
              toLocation,
              true
            );
            setPiecesOnBoard(players, initBoard(boardSize));
          } else {
            updatePieceLoc(
              players,
              activePlayer,
              activePieceLoc,
              toLocation,
              kingStatus
            );
            setPiecesOnBoard(players, initBoard(boardSize));
          }
        }
        break;
      default:
        console.log("NULL");
    }
  };

  const calcOpponentsLoc = (fromLoc, toLoc) => {
    if (toLoc[0] < fromLoc[0] && toLoc[1] < fromLoc[1])
      return [toLoc[0] + 1, toLoc[1] + 1];
    if (toLoc[0] > fromLoc[0] && toLoc[1] < fromLoc[1])
      return [toLoc[0] - 1, toLoc[1] + 1];
    if (toLoc[0] < fromLoc[0] && toLoc[1] > fromLoc[1])
      return [toLoc[0] + 1, toLoc[1] - 1];
    if (toLoc[0] > fromLoc[0] && toLoc[1] > fromLoc[1])
      return [toLoc[0] - 1, toLoc[1] - 1];
  };

  const isJump = (fromLoc, toLoc) => {
    if (toLoc[1] + 1 < fromLoc[1] || toLoc[1] > fromLoc[1] + 1) return true;
  };

  const changeTurn = () => {
    if (activePlayer === "red") {
      updateActivePlayerState("blue");
      clearLegalMoves();
      isWin();
      sendBoard(ref.current, availableMovesRef.current, activePlayer, players);
    } else {
      updateActivePlayerState("red");
      clearLegalMoves();
      isWin();
      sendBoard(ref.current, availableMovesRef.current, activePlayer, players);
    }
  };

  const clearLegalMoves = () => {
    updateAvailableMovesState(null);
  };

  const isWin = () => {
    if (players[0].score === 0) {
      alert("blue Wins!");
    }
    if (players[1].score === 0) {
      alert("Red Wins!");
    }
  };

  const startGame = (e) => {
    setInGame(true);
    let board = initBoard(boardSize);
    let players = initPlayers(userList);
    setBoard(board);
    setPlayers(players);
    let newBoard = setPiecesOnBoard(players, board);
    let legalMoves = getAllLegalMoves(activePlayer, board);
    let data = { board: newBoard, players: players, moves: legalMoves };
    socket.emit("initiate Board", data);
  };

  return (
    <GameBox>
      {!board ? (
        <div>
          {userList.length < 2 ? (
            <div>Waiting on another player to join the room.</div>
          ) : (
            startGame()
          )}
        </div>
      ) : (
        <div>
          <GameStatusBar activePlayer={activePlayer} players={players} />
          <GameBoard
            board={board}
            activePlayer={activePlayer}
            activePieceLoc={activePieceLoc}
            setActivePieceLoc={setActivePieceLoc}
            showMoves={showMoves}
            players={players}
            movePiece={movePiece}
            changeTurn={changeTurn}
            setActivePiece={setActivePiece}
            userId={currentUser.id}
          />
        </div>
      )}
    </GameBox>
  );
}
