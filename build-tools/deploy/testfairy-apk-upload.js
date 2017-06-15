import path from "path";
import got from "got";
import fs from "fs";
import FormData from "form-data";
import { appVersion, buildNumber } from "../../appConfig";

TESTFAIRY_API_KEY = "9a40b67784b19198b12182a16cbb7fdc4adab566";

const upload = (apkPath, comment) => {
  // upload
  console.log("Upload APK ...");

  const startTime = Date.now();

  const form = new FormData();
  form.append("api_key", TESTFAIRY_API_KEY);
  form.append("file", fs.createReadStream(apkPath));
  form.append("video", "wifi");
  form.append("duration", "10m");
  form.append("comment", comment);
  form.append("testers-groups", "internal");
  form.append("auto-update", "off");
  form.append("notify", "on");
  form.append("instrumentation", "off");

  return got
    .post(`https://app.testfairy.com/api/upload/`, {
      body: form,
      json: false
    })
    .then(res => {
      console.log(
        `Upload took: ${parseInt((Date.now() - startTime) / 1000)} seconds`
      );

      return res.body;
    });
};

const apkPath = process.argv.pop();

upload(apkPath, `Build ${appVersion} (${buildNumber})`)
  .then(json => {
    const res = json;
    // console.log(res);
    // console.log(res.status);
    // if (res.status !== "ok") {
    //   throw new Error(`Upload failed: ${res.message}`);
    // }
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
