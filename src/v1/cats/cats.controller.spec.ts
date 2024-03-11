import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { CatsController } from "src/v1/cats/cats.controller";
import { CatsService } from "src/v1/cats/cats.service";
import { mockCats } from "src/v1/cats/__mocks__";

describe("🚀 [/api/v1/cats] - CatsController", () => {
  const NOT_EXIEST_ID = "000000000-0000-0000-0000-000000000000";
  let controller: CatsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService, PrismaService],
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

        const exCat = await controller.findOne({ id });

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
      const exCats = await controller.findAll();

      exCats.forEach((exCat, index) => {
        expect(exCat.id).toEqual(mockCats[index].id);
        expect(exCat.name).toEqual(mockCats[index].name);
        expect(exCat.age).toEqual(mockCats[index].age);
        expect(exCat.gender).toEqual(mockCats[index].gender);
      });
    });

    // 부분 찾기
    it.each(mockCats.map((cat) => [cat.id]))(
      "(GET) [/api/v1/cats/:catId] - 특정 고양이가 패칭되는지? - %s",
      async (id) => {
        const exCat = await controller.findOne({ id });
        const mockCat = mockCats.find((mockCat) => mockCat.id === id);

        expect(exCat.id).toEqual(mockCat.id);
        expect(exCat.name).toEqual(mockCat.name);
        expect(exCat.age).toEqual(mockCat.age);
        expect(exCat.gender).toEqual(mockCat.gender);
      },
    );
    // 부분 찾기 실패 ( 404 )
    it("(GET) [/api/v1/cats/:catId] - 찾으려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.findOne({ id: NOT_EXIEST_ID });
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
  });

  describe("🚀 고양이 수정", () => {
    const mockCat = mockCats[0];
    const toBeModified = { name: "유중혁", age: 28, gender: true };

    // 수정
    it(`(PATCH) [/api/v1/cats/:catId] - 고양이가 수정되는지? - ${mockCats[0].id}`, async () => {
      const updatedCat = await controller.update(
        { id: mockCat.id },
        toBeModified,
      );
      const exCat = await controller.findOne({ id: mockCat.id });

      expect(exCat.id).toEqual(updatedCat.id);
      expect(exCat.name).toEqual(updatedCat.name);
      expect(exCat.age).toEqual(updatedCat.age);
      expect(exCat.gender).toEqual(updatedCat.gender);
    });
    // 수정 실패 ( 404 )
    it("(PATCH) [/api/v1/cats/:catId] - 수정하려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.update({ id: NOT_EXIEST_ID }, {});
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
    // 수정하려는 고양이 이름 중복 ( 409 )
    it("(PATCH) [/api/v1/cats/:catId] - 수정하려는 고양이의 이름이 이미 존재하는지?", async () => {
      try {
        await controller.findOne({ id: mockCat.id });
        await controller.update({ id: mockCat.id }, toBeModified);

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
        const deletedCat = await controller.delete({ id });

        expect(id).toEqual(deletedCat.id);
      },
    );
    // 삭제 실패 ( 404 )
    it("(DELETE) [/api/v1/cats/:catId] - 삭제하려는 고양이가 존재하지 않는지?", async () => {
      try {
        await controller.delete({ id: NOT_EXIEST_ID });
        expect("").toThrow();
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 고양이가 존재하지 않습니다.");
      }
    });
  });
});
