import readline from "readline";
import colors from "colors";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const countDown = () => {
  process.stdout.write("Введите дату ММ-ДД-ГГГГ ЧЧ:ММ:СС ");

  rl.on("line", (date) => {
    const countDownDate = new Date(`${date}`).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeleft = countDownDate - now;

      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      process.stdout.write(
        ` Осталось ${days}д ${hours}ч ${minutes}м ${seconds}с `
      );
      process.stdout.cursorTo(0);

      if (timeleft <= 0) {
        clearInterval(timer);
        process.stdout.write(colors.rainbow("Время пришло!!!"));
        rl.close();
      }
    }, 1000);
  });
};

countDown();
