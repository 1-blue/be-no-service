import { Prisma } from "@prisma/client";

/** 공용으로 사용할 이미지들 */
export const seedImages: Prisma.ImageCreateInput[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "avatar1.png",
    url: "https://no-service.s3.ap-northeast-2.amazonaws.com/images/default/avatar1.png",
    status: "DEFAULT",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "avatar2.png",
    url: "https://no-service.s3.ap-northeast-2.amazonaws.com/images/default/avatar2.png",
    status: "DEFAULT",
  },
];
