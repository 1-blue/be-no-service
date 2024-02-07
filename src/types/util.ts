/** 함수 형태만 제외한 타입의 `Key`를 얻는 유틸리티  */
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

/** 함수 형태만 제외한 타입을 얻는 유틸리티 */
export type NonFunctionProperties<T> = Pick<
  T,
  Exclude<keyof T, FunctionKeys<T>>
>;
