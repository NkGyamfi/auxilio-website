import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = [
  { url: "https://headroom.com/runner.gif", dest: "public/images/runner.gif" },
  { url: "https://headroom.com/icon?ca651d249e067417", dest: "public/seo/icon.png" },
  { url: "https://www.headroom.com/ogImage.png", dest: "public/seo/og-image.png" },
];

async function downloadOne({ url, dest }) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const destPath = path.join(process.cwd(), dest);
  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
  console.log(`saved ${dest} (${buf.length} bytes)`);
}

async function main() {
  const batchSize = 4;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(
      batch.map((asset) =>
        downloadOne(asset).catch((err) => console.error(`FAILED ${asset.url}:`, err.message))
      )
    );
  }
}

main();
