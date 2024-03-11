declare namespace NodeJS {
  interface ProcessEnv {
    /** 실행 환경 */
    readonly NODE_ENV: "production" | "development" | "test";
    /** 실행 포트 */
    readonly PORT: string;

    /** 데이터베이스 URL `postgresql://유저명:비밀번호@호스트:포트/데이터베이스명?schema=스키마명` */
    readonly DATABASE_URL: `postgresql://${string}`;
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

    /**  현재 사용중인 AWS region */
    readonly AWS_REGION: string;
    /**  `IAM`에서 얻은 엑세스 키 */
    readonly AWS_ACCESS_KEY: string;
    /**  `IAM`에서 얻은 비밀 엑세스 키 */
    readonly AWS_ACCESS_SECRET_KEY: string;

    /**  S3 `Bucket` */
    readonly AWS_S3_BUCKET: string;
    /**  S3 기본 `URL` */
    readonly AWS_S3_BASE_URL: string;
  }
}
