import fs from "fs";

const html = fs.readFileSync("ohi-home.html", "utf8");
const start = html.indexOf("footer_slider");
const chunk = html.slice(start, start + 20000);
const urls = [
  ...chunk.matchAll(
    /data-lazy-src="(https:\/\/www\.outsourcinghubindia\.com\/wp-content\/uploads\/[^"]+)"/g,
  ),
].map((m) => m[1]);

console.log(urls.length);
urls.forEach((u) => console.log(u));
