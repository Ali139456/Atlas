import fs from "fs";
import path from "path";
import sharp from "sharp";

const certDir = path.join("public", "images", "certificates");
fs.mkdirSync(certDir, { recursive: true });

const items = [
  {
    name: "SOC 2 Type II",
    file: "soc2-type-ii.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/02/SOC-2-TYPE-2-1.png",
  },
  {
    name: "ISO 27001",
    file: "iso-27001.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/02/ISO_27001-1.png",
  },
  {
    name: "NAHMA Member",
    file: "nahma.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/02/NAHMA-Member-Logo.webp",
  },
  {
    name: "NASSCOM Member",
    file: "nasscom.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2021/04/nasscom.png",
  },
  {
    name: "GRESB",
    file: "gresb.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2026/03/GRESB_organization_logo.webp",
  },
  {
    name: "IACC",
    file: "iacc.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/04/IACC-LOGO.jpg",
  },
  {
    name: "CFMA Member",
    file: "cfma.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2025/06/logo-wide-hi-res.png",
  },
  {
    name: "CAI Business Partner",
    file: "cai-business-partner.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2025/06/CAIBusPartner.jpg",
  },
  {
    name: "CII",
    file: "cii.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/04/CII-LOGO-NEW-removebg-preview.png",
  },
  {
    name: "NAA Member",
    file: "naa.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2026/03/NAA-logo_bgwhite.png",
  },
  {
    name: "Community Associations",
    file: "cc-logo.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2024/04/cc-logo.png",
  },
  {
    name: "Quadel",
    file: "quadel.png",
    url: "https://www.outsourcinghubindia.com/wp-content/uploads/2026/05/quadel-removebg-preview.png",
  },
];

for (const item of items) {
  const dest = path.join(certDir, item.file);
  const res = await fetch(item.url);
  if (!res.ok) throw new Error(`Failed ${item.url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).png().toFile(dest);
  console.log(`saved ${item.file}`);
}
