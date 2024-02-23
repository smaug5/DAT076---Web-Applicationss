import * as SuperTest from "supertest"; // behövs
import { app } from "../src/start"; // Behövs

// test("Start application", async () => {
    
// });

const request = SuperTest.default(app);

test("This is a stub", async () => {
    expect(1===1).toBeTruthy();
  });
  // TODO make an end-to-end test - Smaug

test("End-to-end test", async () => {
  const id = 123;
  const title = "First project";
  const desc = "FIRST!!1!";

  const res1 = await request.post("/api/project").send({
    "id": id,
    "title": title,
    "desc": desc
  }); // request funkar inte för du har inte definerat request som vi gör på rad 5 i streckis-Wap. Du kommer nog också behöva importsen


});