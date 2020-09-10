export const sendViewLog = (placesCount: number): void => {
  console.log(`sendLog: ${placesCount} items displayed`);
  // 実際の計測ログ送信 code は省略。code image は以下:
  // kzs("trackCustomEvent", { action:"places-ui-displayed", items: placesCount });
};
