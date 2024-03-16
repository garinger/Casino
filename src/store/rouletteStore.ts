import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Socket, io } from "socket.io-client";
import { RouletteGame } from "../types/RouletteGame";

interface ServerToClientEvents {
  gameState: (
    outcome: number | null,
    spinning: boolean,
    spinStart: number | null,
    spinEnd: number | null,
    spinOffset: number | null,
    nextSpin: number | null,
    pastGames: RouletteGame[],
  ) => void;
}

interface ClientToServerEvents {}

interface RouletteState {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
  delta: number | null;
  outcome: number | null;
  spinning: boolean;
  spinStart: number | null;
  spinEnd: number | null;
  spinOffset: number | null;
  nextSpin: number | null;
  pastGames: RouletteGame[];
}

const env = import.meta.env;
const socketUri = `${env.VITE_SOCKET_HOSTNAME}:${env.VITE_SOCKET_PORT}`;

const useRouletteStore = create<RouletteState>()(
  devtools((set) => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(socketUri);

    // TODO: Figure out how to separate socket state and roulette state.
    socket.on("gameState", (gameState: any) => {
      set(() => ({
        delta: Date.now() - gameState.serverTime,
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
      delta: null,
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

export default useRouletteStore;
