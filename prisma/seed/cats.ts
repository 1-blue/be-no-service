import { Prisma } from "@prisma/client";

/** 테스트용 데이터인 고양이들 */
export const seedCats: Prisma.CatCreateManyInput[] = [
  {
    name: "김독자",
    age: 28,
    gender: true,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "유상아",
    age: 27,
    gender: false,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "이길영",
    age: 11,
    gender: true,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "한수영",
    age: 26,
    gender: false,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "유중혁",
    age: 28,
    gender: true,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "이지혜",
    age: 17,
    gender: false,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "김남운",
    age: 18,
    gender: true,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
  {
    name: "신유승",
    age: 11,
    gender: false,
    imageId: "11111111-1111-1111-1111-111111111111",
  },
];
