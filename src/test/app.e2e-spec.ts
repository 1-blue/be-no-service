import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "src/app.module";

import { mockCats } from "src/v1/cats/__mocks__";

describe("🚀 AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // FIXME: (수정하기 prisma) 고양이 테스트
  describe("🚀 CatController CRUD", () => {
    // 생성
    it.each(mockCats.map((cat) => [cat.id, cat.name, cat.age, cat.gender]))(
      "(POST) [/api/v1/cats] - 고양이가 생성되는지?",
      async (id, name, age, gender) => {
        const mockCat = { id, name, age, gender };

        const response = await request(app.getHttpServer())
          .post("/api/v1/cats")
          .send(mockCat);

        // 시간값 제외
        delete response.body.createdAt;
        delete response.body.updatedAt;
        delete response.body.deletedAt;

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(mockCat);
      },
    );

    // 전체 찾기
    it("(GET) [/api/v1/cats] - 고양이들이 모두 패칭되는지?", async () => {
      const response = await request(app.getHttpServer()).get("/api/v1/cats");

      // 시간값 제외
      const processingResponse = response.body.map(
        ({ id, name, age, gender }) => ({ id, name, age, gender }),
      );

      expect(response.statusCode).toBe(200);
      expect(processingResponse).toEqual(mockCats);
    });

    // 부분 찾기
    it.each(mockCats.map((cat) => [cat.id]))(
      "(GET) [/api/v1/cats/:catId] - 특정 고양이가 패칭되는지?",
      async (id) => {
        const response = await request(app.getHttpServer()).get(
          `/api/v1/cats/${id}`,
        );

        // 시간값 제외
        delete response.body.createdAt;
        delete response.body.updatedAt;
        delete response.body.deletedAt;

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          mockCats.find((mockCat) => mockCat.id === id),
        );
      },
    );

    // 수정
    it(`(PATCH) [/api/v1/cats/:catId] - 고양이가 수정되는지?`, async () => {
      const mockCat = mockCats[0];
      const toBeModified = { name: "김독자", age: 28, gender: true };

      const updatedResponse = await request(app.getHttpServer())
        .patch(`/api/v1/cats/${mockCat.id}`)
        .send(toBeModified);

      const getResponse = await request(app.getHttpServer()).get(
        `/api/v1/cats/${mockCat.id}`,
      );

      // 시간값 비교에서 제외
      delete getResponse.body.createdAt;
      delete getResponse.body.updatedAt;
      delete getResponse.body.deletedAt;

      // 하나의 컬럼이 변화되었는지
      expect(updatedResponse.body.affected).toBe(1);
      // 변화된 데이터와 수정한 데이터가 일치하는지
      expect(getResponse.body).toEqual({ ...mockCat, ...toBeModified });
    });

    // 삭제
    it.each(mockCats.map((cat) => [cat.id]))(
      "(DELETE) [/api/v1/cats/:catId] - 고양이 제거 테스트",
      async (id) => {
        const deletedResponse = await request(app.getHttpServer()).delete(
          `/api/v1/cats/${id}`,
        );

        const getResponse = await request(app.getHttpServer()).get(
          `/api/v1/cats/${id}`,
        );

        // 하나의 컬럼이 변화되었으며
        expect(deletedResponse.body.affected).toEqual(1);
        // 해당 고양이가 존재하지 않는지
        expect(getResponse.body).toEqual({});
      },
    );
  });
});
