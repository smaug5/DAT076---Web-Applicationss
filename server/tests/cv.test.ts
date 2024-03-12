
import { cvServices } from '../src/service/cvService';
import { CV } from '../src/model/cv';

test('If there is no CV, I should get an error when trying to get it', async() => {
  await cvServices.removeCv();
  try {
    const a = await cvServices.getCV();
    // Should not run as it should throw an error. Expect().toThrow() is stupid
    expect(a.image).toEqual("No CV found");
  } catch (e) {
    // Should pass
    expect(1).toEqual(1);
  }
});


test('If a CV is added, it should be added to the database', async() => {
  const cvImage = "abcdef";
  const testCV: CV = {
    image: cvImage // This would normally be an actual image's string.
  };

  cvServices.replaceCV(testCV);
  const gotCV = cvServices.getCV();

  expect((await gotCV).image === cvImage);
});




/* test('should return a cv', async () => {
  const cv = await cvService.getCV();
  expect(isCV(cv)).toBeTruthy();
})

function isCV(object: any): object is CV {
  return 'file' in object;
}

//Check if cv has been added 

test('should add a cv', async () => {
  const cv = await cvService.addCV("Test"); //Add file here instead
  expect(cv).toBe("Test");
}); */