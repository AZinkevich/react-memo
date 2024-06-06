import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage.jsx";
import { LeaderBoardPage } from "./pages/LeaderBoardPage/LeaderBoardPage.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SelectLevelPage />,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoardPage />,
    },
    {
      path: "/game/:pairsCount",
      element: <GamePage />,
    },
  ],
  /**
   * basename нужен для корректной работы в gh pages
   * он же указан в homepage package.json и в index.html
   */
  { basename: "/react-memo" },
);
