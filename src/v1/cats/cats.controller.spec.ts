import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import testDbConfig from "src/database/test-typeorm.config";

import { CatsController } from "src/v1/cats/cats.controller";
import { CatsService } from "src/v1/cats/cats.service";
import { Cat } from "src/v1/cats/entities/cat.entity";
import { mockCats } from "src/v1/cats/__mocks__";

describe("🚀 [/api/v1/cats] - CatsController", () => {
  let controller: CatsController;
  const notFoundCatId = "f3a0b93c-345d-4998-a0e1-7cba262cb453";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testDbConfig),
        TypeOrmModule.forFeature([Cat]),
      ],
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it("[/api/v1/cats] - 컨트롤러 및 서비스가 존재하는지?", () => {
    expect(controller).toBeDefined();
  });

  describe("🚀 고양이 생성", () => {
    // 생성
    it.each(mockCats.map((cat) => [cat.id, cat.name, cat.age, cat.gender]))(
      "(POST) [/api/v1/cats] - 고양이가 생성되는지? ( %s )",
      async (id, name, age, gender) => {
        const createdCat = await controller.create({
          id,
          name,
          age,
          gender,
        });

        const exCat = await controller.findOne(id);

        expect(createdCat).toEqual(exCat);
      },
    );
    // 생성하려는 고양이 이름 중복 ( 409 )
    it("(POST) [/api/v1/cats] - 생성하려는 고양이의 이름이 이미 존재하는지?", async () => {
      try {
        await controller.create(mockCats[0]);
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 이름입니다.");
      }
    });
  });

  describe("🚀 고양이 찾기", () => {
    // 전체 찾기
    it("(GET) [/api/v1/cats] - 고양이들이 모두 패칭되는지?", async () => {
      const exCats = await controller.findAll({
        select: { id: true, name: true, age: true, gender: true },
      });

      expect(exCats).toEqual(mockCats);
    });

    // 부분 찾기
    it.each(mockCats.map((cat) => [cat.id]))(
      "(GET) [/api/v1/cats/:catId] - 특정 고양이가 패칭되는지? - %s",
      async (id) => {
        const exCat = await controller.findOne(id);

        // 시간값 비교에서 제외
        delete exCat.createdAt;
        delete exCat.updatedAt;
        delete exCat.deletedAt;

        expect(exCat).toEqual(mockCats.find((mockCat) => mockCat.id === id));
      },
    );
    // 부분 찾기 실패 ( 404 )
    it("(GET) [/api/v1/cats/:catId] - 찾으려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.findOne(notFoundCatId);
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
  });

  describe("🚀 고양이 수정", () => {
    const targetCat = mockCats[0];
    const toBeModified = { name: "김독자", age: 28, gender: true };

    // 수정
    it(`(PATCH) [/api/v1/cats/:catId] - 고양이가 수정되는지? - ${mockCats[0].id}`, async () => {
      const updatedResult = await controller.update(targetCat.id, toBeModified);
      const exCat = await controller.findOne(targetCat.id);

      // 시간값 비교에서 제외
      delete exCat.createdAt;
      delete exCat.updatedAt;
      delete exCat.deletedAt;

      // 하나의 컬럼이 변화되었는지
      expect(updatedResult.affected).toBe(1);
      // 변화된 데이터와 수정한 데이터가 일치하는지
      expect(exCat).toEqual({ ...targetCat, ...toBeModified });
    });
    // 수정 실패 ( 404 )
    it("(PATCH) [/api/v1/cats/:catId] - 수정하려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.update(notFoundCatId, {});
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
    // 수정하려는 고양이 이름 중복 ( 409 )
    it("(PATCH) [/api/v1/cats/:catId] - 수정하려는 고양이의 이름이 이미 존재하는지?", async () => {
      try {
        await controller.findOne(targetCat.id);
        await controller.update(targetCat.id, toBeModified);

        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 이름입니다.");
      }
    });
  });

  describe("🚀 고양이 삭제", () => {
    // 삭제
    it.each(mockCats.map((cat) => [cat.id]))(
      "(DELETE) [/api/v1/cats/:catId] - 고양이 제거 테스트 - %s",
      async (id) => {
        const { affected } = await controller.delete(id);

        // 하나의 컬럼이 변화되었으며
        expect(affected).toEqual(1);
      },
    );
    // 삭제 실패 ( 404 )
    it("(DELETE) [/api/v1/cats/:catId] - 삭제하려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.delete(notFoundCatId);
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
  });
});
