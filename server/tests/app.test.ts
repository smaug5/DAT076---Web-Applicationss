import * as SuperTest from "supertest"; // behövs
import { app } from "../src/start"; // Behövs
import { project } from "../src/model/project";


// test("Start application", async () => {
    
// });

const request = SuperTest.default(app);

// Creates two projects and checks that those confirm that they're added. Then looks for one of the projects and checks that the correct one got returned.
test("End-to-end test", async () => {
  const id = 123;
  const id2 = 234;
  const title = "First project";
  const title2 = "Second project";
  const desc = "FIRST!!1!";
  const desc2 = "SECOND";

  const res1 = await request.put("/api/project").send({
    "id": id,
    "title": title,
    "desc": desc
  });
    expect(res1.statusCode).toEqual(200);

  const res1_2 = await request.put("/api/project").send({
    "id" : id2,
    "title" : title2,
    "desc" : desc2
  })
   expect(res1_2.statusCode).toEqual(200);
   
   const res2 = await request.get("/api/project");
   expect(res2.statusCode).toEqual(200);
   expect(res2.body.map((project : project) => project.title)).toContain(title);
   expect(res2.body.map((project : project) => project.title)).toContain(title2);

  const res3 = await request.get("/api/project/"+title2);
  expect(res3.body.title).toContain(title2);

});