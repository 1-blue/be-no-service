import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/** 테스트 데이터베이스 설정 */
const testDbConfig: TypeOrmModuleOptions = {
  /** 데이터베이스 종류 */
  type: "postgres",
  /** 테스트 전용 스키마 */
  schema: process.env.DB_SCHEMA || "test",

  /** 데이터베이스 서버 호스트 */
  host: process.env.DB_HOST || "localhost",
  /** 데이터베이스 포트 */
  port: Number(process.env.DB_PORT || 5432),
  /** 데이터베이스 유저명 */
  username: process.env.DB_USERNAME || "master",
  /** 데이터베이스 비밀번호 */
  password: process.env.DB_PASSWORD || "tls123",
  /** 연결할 데이터베이스 이름 ( `no-service` ) */
  database: process.env.DB_DATABASE || "1234",

  /** 스키마 자동 동기화 ( production에서는 false ) */
  synchronize: true,
  /** 애플리케이션 실행시 기존 스키마 삭제 여부 */
  dropSchema: false,
  /** 애플리케이션 재시작 시 연결 유지 */
  keepConnectionAlive: true,
  /** 데이터베이스 쿼리 로깅 여부 */
  logging: JSON.parse(process.env.DB_LOGGING || "false"),
  /**
   * 엔티티 클래스 경로
   * 현재 경로에서 `one-depth`위의 모든 폴더에서 `.entity.ts` 형태의 파일을 선택
   * */
  entities: [__dirname + "/../**/*.entity.ts"],
  extra: {
    max: 100,
  },
};

export default testDbConfig;
