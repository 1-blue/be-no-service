declare namespace NodeJS {
  interface ProcessEnv {
    /** 실행 환경 */
    readonly NODE_ENV: "production" | "development" | "test";
    /** 실행 포트 */
    readonly PORT: string;

    /** `DB` 스키마 */
    readonly DB_SCHEMA: "public" | "development" | "test";
    /** `DB` 호스트 */
    readonly DB_HOST: string;
    /** `DB` 포트 */
    readonly DB_PORT: string;
    /** `DB`에서 사용할 유저 이름 */
    readonly DB_USERNAME: string;
    /** `DB`에서 사용할 비밀번호 */
    readonly DB_PASSWORD: string;
    /** `DB` 이름 */
    readonly DB_DATABASE: string;
    /** `DB` 명령어 로깅 여부 */
    readonly DB_LOGGING: string;

    /** 쿠키 암호화에 사용하는 값 */
    readonly COOKIE_SECRET: string;

    /** 클라이언트 URL */
    readonly CLIENT_URL: string;

    /** OAuth로 로그인한 유저의 비밀번호로 설정할 값 */
    readonly OAUTH_PASSWORD: string;

    /** 카카오 ( `REST API KEY` ) */
    readonly KAKAO_CLIENT_ID: string;
    /** 카카오 ( `JavaScript KEY` ) */
    readonly KAKAO_CLIENT_SECRET: string;
    /** 카카오 ( 검증 완료 시 응답할 URL ) */
    readonly KAKAO_CLIENT_CALLBACK_URL: string;

    /** 구글 ( `Client Id` ) */
    readonly GOOGLE_CLIENT_ID: string;
    /** 구글 ( `Client Secret Password` ) */
    readonly GOOGLE_CLIENT_SECRET: string;
    /** 구글 ( 검증 완료 시 응답할 URL ) */
    readonly GOOGLE_CLIENT_CALLBACK_URL: string;
  }
}
