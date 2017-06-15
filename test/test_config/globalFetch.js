// Mocking the global.fetch included in React Native
global.fetch = jest.fn();

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = body => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve(JSON.parse(body)) })
  );
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = error => {
  fetch.mockImplementationOnce(() => Promise.reject(error));
};

jest.mock("Linking", () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
  canOpenURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
  getInitialURL: jest.genMockFn().mockReturnValue(Promise.resolve())
}));
// jest.mock("ListView", () => jest.genMockFromModule("ListView"));
jest.mock("ListView", () => {
  return require("react").createClass({
    statics: {
      DataSource: require.requireActual("ListView").DataSource
    },
    scrollTo() {},
    render() {
      return require("react").createElement(
        "ListView",
        this.props,
        this.props.children
      );
    }
  });
});
jest.mock("ScrollView", () => jest.genMockFromModule("ScrollView"));
