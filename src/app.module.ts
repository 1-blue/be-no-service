import { Module } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { TypeOrmConfig } from "src/database/typeorm.config";

import { CatsModule } from "src/v1/cats/cats.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      /** `typeorm` 설정 */
      useClass: TypeOrmConfig,
      /** DB 연결 */
      dataSourceFactory: async (options: DataSourceOptions) => {
        const connectDB = new DataSource(options).initialize();

        connectDB
          .then(() => {
            console.log(`🚀 DB 연결 성공 !! ( ${process.env.DB_SCHEMA} )`);
          })
          .catch((error) => console.error("🚀 DB 연결 실패 >> ", error));

        return connectDB;
      },
    }),
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
