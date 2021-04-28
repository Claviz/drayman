import { getAngularElements } from "./element-mapper";

test('something', () => {
    expect(getAngularElements()).toMatchSnapshot();
});