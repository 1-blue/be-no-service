import type { ImageStatus } from "@prisma/client";

/** 대소문자 합쳐진 이미지 상태들 ( `dto`에서 유효성 검사에서 대소문자 모두 허용하기 위해 사용 ) */
export const IMAGE_STATUSES: (ImageStatus | Lowercase<ImageStatus>)[] = [
  "DEFAULT",
  "default",
  "TEMP",
  "temp",
  "USE",
  "use",
  "DELETED",
  "deleted",
];
