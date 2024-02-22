
import { cvService } from '../service/cvServices';
import { CV } from '../model/cv';

test('should return a cv', async () => {
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
})
