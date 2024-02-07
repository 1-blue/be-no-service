import { v4 } from "uuid";

import type { NonFunctionProperties } from "src/types";

import { Cat } from "src/v1/cats/entities/cat.entity";

/** 고양이들 목데이터 */
export const mockCats: NonFunctionProperties<Cat>[] = [
  {
    id: v4(),
    name: "가가",
    age: 1,
    gender: false,
  },
  {
    id: v4(),
    name: "나나",
    age: 2,
    gender: true,
  },
];
