export async function getScores() {
  const res = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("что-то пошло не так");
  } else {
    const resData = await res.json();
    return resData;
  }
}

export const postScore = ({ name, time, achievements }) => {
  return fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
      achievements,
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
