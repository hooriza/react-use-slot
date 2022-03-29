import renderer from "react-test-renderer";
import App from "./App";

test("test with sample code", () => {
  expect(renderer.create(<App />)).toMatchSnapshot();
});
