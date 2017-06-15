// const app_url = "http://staging.shiftcare.com";
// const app_url = "http://192.168.168.28:3000";
const app_url = "http://192.168.100.46:3000";

export default {
  api: {
    url: app_url + "/api/v1"
  },
  root: {
    url: app_url
  },
  app: {
    email: "support@shiftcare.com",
    name: "ShiftCare"
  },
  default: {
    avatar:
      "/assets/avatar-80507efff6f87166c22e4b9e63b9b999ce6e80fc91717ce267491957a4d6553a.png"
  },
  keyValueStore: {
    user: {
      email: "authEmail",
      password: "authPassword",
      token: "authToken"
    }
  },
  shift: {
    status: {
      active: "Active",
      future: "Accepted",
      past: "Finished",
      pending: "Waiting"
    }
  }
};
