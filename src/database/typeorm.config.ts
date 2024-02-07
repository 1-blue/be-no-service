import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      /** 데이터베이스 종류 */
      type: "postgres",
      /** 사용할 스키마 */
      schema: "public",

      /** 데이터베이스 서버 호스트 */
      host: this.configService.get("DB_HOST", "localhost"),
      /** 데이터베이스 포트 */
      port: this.configService.get("DB_PORT", 5432),
      /** 데이터베이스 유저명 */
      username: this.configService.get("DB_USERNAME", "master"),
      /** 데이터베이스 비밀번호 */
      password: this.configService.get("DB_PASSWORD", "1234"),
      /** 연결할 데이터베이스 이름 ( `no-service` ) */
      database: this.configService.get("DB_DATABASE", "nosvc"),

      /** 스키마 자동 동기화 ( production에서는 false ) */
      synchronize: true,
      /** 애플리케이션 실행시 기존 스키마 삭제 여부 */
      dropSchema: false,
      /** 애플리케이션 재시작 시 연결 유지 */
      keepConnectionAlive: true,
      /** 데이터베이스 쿼리 로깅 여부 */
      logging: JSON.parse(this.configService.get("DB_LOGGING", "false")),
      /**
       * 엔티티 클래스 경로
       * 현재 경로에서 `one-depth`위의 모든 폴더에서 `.entity.ts` 형태의 파일을 선택
       * ( 추가로 js도 포함하지 않으면 `EntityMetadataNotFoundError` 발생 )
       * */
      entities: [__dirname + "/../**/*.entity.{ts,js}"],
      extra: {
        max: 100,
      },
    };
  }
}
