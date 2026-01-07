import { DateTime } from 'luxon';

export const screenshotFiles = [
  {
    fileName: 'Screenshot from 2025-11-18 16-23-50.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767168282/4/21/lh9p697dowwoqcvqq2i5.png',
    fileSize: 22288,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-24-52.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767171942/4/21/bcblwrrqpicj7qm3qtj6.png',
    fileSize: 8993,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-35-50.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767180198/4/21/izapv0h8nhzyc7ehlvw4.png',
    fileSize: 22288,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-55-50.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767180215/4/21/pnl5uf1wmf1wfdo44ouq.png',
    fileSize: 111387,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-24-52.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767183292/4/21/mfw7miaejrzngts8unns.png',
    fileSize: 8993,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-24-52.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767183475/4/21/maj6wgjcjonuhewgv7tt.png',
    fileSize: 8993,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-25-43.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767183596/4/21/r2tqf8f0fam0qpe70wxx.png',
    fileSize: 11213,
  },
  {
    fileName: 'Screenshot from 2025-11-18 16-55-50.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767183768/4/21/vshvgg98zeofbigqfxhv.png',
    fileSize: 111387,
  },
  {
    fileName: 'Screenshot from 2025-12-29 18-33-31.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767183851/4/21/e8tywlygdoibr6uim2km.png',
    fileSize: 23861,
  },
  {
    fileName: 'Screenshot from 2025-09-02 17-53-13.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767253094/4/22/fq26aof28n0yirzllhzn.png',
    fileSize: 80788,
  },
  {
    fileName: 'sql_test_06.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767253399/4/22/j7hhzqlad9zsyogwyvuq.png',
    fileSize: 5262,
  },
  {
    fileName: 'sql_test_04.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767253582/4/22/ehpgtr8pq8baqiddwqth.png',
    fileSize: 11213,
  },
  {
    fileName: 'animal03.jpeg',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767604330/4/22/vqcmkzqw6ds1i2brkooz.jpg',
    fileSize: 1777884,
  },
  {
    fileName: 'computer.jpg',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767604210/4/22/lid0ppx7tw3qy4tkvtx6.jpg',
    fileSize: 29174,
  },
  {
    fileName: 'message.png',
    filePath:
      'https://res.cloudinary.com/dex6kbbs6/image/upload/v1767672729/4/22/so6rqinrvfsytrlgztro.png',
    fileSize: 28438,
  },
];

export function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomActivityTime(day: DateTime) {
  return day
    .set({
      hour: Math.floor(Math.random() * 24),
      minute: Math.floor(Math.random() * 60),
      second: Math.floor(Math.random() * 60),
    })
    .toUTC();
}
