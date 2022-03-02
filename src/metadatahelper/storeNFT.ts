import { NFTStorage, File } from "nft.storage";
import fs from "fs";
import path from "path";
import "dotenv/config";

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.NFT_STORAGE_API_KEY || "";

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
  const imageContent = await fs.promises.readFile(path.join(__dirname, "../../assets", "veevcoin.png"));
  return new File([imageContent], "veevcoin.png", {
    type: "image/png",
  });
}

async function storeExampleNFT() {
  const image = await getExampleImage();
  const nft = {
    image, // use image Blob as `image` field
    name: "Veev ID NFT",
    description: "One Click Checkin & Checkout",
    external_url: "https://veev.app",
    properties: {
      zkproof:
        "F3WHcnmoXLVVjjHvhUSbJMKU4EhxMVVNl65n/XyTx93jXiUy/pM9zaPYZXo5+wDpWDCzcAPWOgmlgUKQ9+g+BPwOmORQmpp4Afb92ylxxfsZZsrTBV3wHf/RS1Wpe1QdiCm7jNZF7wPkG1pOw4vBVSjoq5uCX14sFVfLY5mjHwE=",
    },
  };

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
}

storeExampleNFT();
