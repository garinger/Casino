import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Socket, io } from "socket.io-client";
import { PastRouletteGame } from "../types/PastRouletteGame";

interface ServerToClientEvents {
  gameState: (
    outcome: number | null,
    spinning: boolean,
    spinStart: Date | null,
    spinEnd: Date | null,
    spinOffset: number | null,
    nextSpin: Date | null,
    pastGames: PastRouletteGame[],
  ) => void;
}

interface ClientToServerEvents {}

interface RouletteState {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
  outcome: number | null;
  spinning: boolean;
  spinStart: Date | null;
  spinEnd: Date | null;
  spinOffset: number | null;
  nextSpin: Date | null;
  pastGames: PastRouletteGame[];
}

const env = import.meta.env;
const socketUri = `${env.VITE_SOCKET_HOSTNAME}:${env.VITE_SOCKET_PORT}`;

const useRouletteState = create<RouletteState>()(
  devtools((set) => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(socketUri);

    // TODO: Figure out how to separate socket state and roulette state.
    socket.on("gameState", (gameState: any) => {
      set(() => ({
        outcome: gameState.outcome,
        spinning: gameState.spinning,
        spinStart: gameState.spinStart,
        spinEnd: gameState.spinEnd,
        spinOffset: gameState.spinOffset,
        nextSpin: gameState.nextSpin,
        pastGames: gameState.pastGames,
      }));
    });

    return {
      socket,
      outcome: null,
      spinning: false,
      spinStart: null,
      spinEnd: null,
      spinOffset: null,
      nextSpin: null,
      pastGames: [],
    };
  }),
);

export default useRouletteState;
