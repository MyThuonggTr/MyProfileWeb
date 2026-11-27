// Print a local A4 report page (HTML) to PDF with the installed Google Chrome.
// Usage: node scripts/print-report.mjs <input.html> <output.pdf>
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("usage: print-report.mjs <input.html> <output.pdf>");
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(input)).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: output, format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: '<div style="width:100%;font:8px Arial;color:#4A5565;padding:0 18mm;display:flex;justify-content:space-between"><span>Riverside Residences · Báo cáo nghiên cứu khả thi tóm tắt</span><span class="pageNumber"></span></div>',
  });
  console.log("saved", output);
} finally {
  await browser.close();
}
