export const getScores = () => {
  return fetch("https://wedev-api.sky.pro/api/leaderboard", {
    method: "GET",
  }).then(res => {
    if (!res.ok) {
      throw new Error("что-то пошло не так");
    }
    return res.json();
  });
};

export const postScore = ({ name, time }) => {
  return fetch("https://wedev-api.sky.pro/api/leaderboard", {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
    }),
  }).then(res => {
    if (res.status === 400) {
      throw new Error("Данные не в формате JSON");
    }
    if (!res.ok) {
      throw new Error("что-то пошло не так");
    }
    return res.json();
  });
};
