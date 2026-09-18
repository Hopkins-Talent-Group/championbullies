import { config } from "dotenv";
config({ path: ".env.local" });

import { sendOwnerNotification, sendClientConfirmation } from "./src/lib/email";

async function main() {
  console.log("Testing owner notification...");
  try {
    await sendOwnerNotification({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "+15555555555",
      homeType: "house",
      hasYard: true,
      otherPets: "None",
      childrenAges: "None",
      hoursAlone: "6",
      puppyName: "Shaggy",
      breed: "English Bulldog",
      price: "$4,500",
      reference: "TEST-123",
    });
    console.log("OK ? owner email sent");
  } catch (err) {
    console.error("FAIL ? owner email:", err);
  }

  console.log("Testing client confirmation...");
  try {
    await sendClientConfirmation({
      firstName: "Test",
      email: "test@example.com",
      puppyName: "Shaggy",
      price: "$4,500",
      reference: "TEST-123",
    });
    console.log("OK ? client email sent");
  } catch (err) {
    console.error("FAIL ? client email:", err);
  }
}

main().catch(console.error);