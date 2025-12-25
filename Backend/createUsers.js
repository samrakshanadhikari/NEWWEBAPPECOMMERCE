
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/userModel.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function createUsers() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // First admin
    const adminEmail1 = "admin@example.com";
    const adminPassword1 = "adminpassword123";
    const adminUsername1 = "admin_user1";
    const adminRole1 = "admin";

    // First user
    const userEmail1 = "user@example.com";
    const userPassword1 = "userpassword123";
    const userUsername1 = "regular_user1";
    const userRole1 = "user";

    // Second admin
    const adminEmail2 = "admin2@example.com";
    const adminPassword2 = "adminpassword456";
    const adminUsername2 = "admin_user2";
    const adminRole2 = "admin";

    // Second user
    const userEmail2 = "user2@example.com";
    const userPassword2 = "userpassword456";
    const userUsername2 = "regular_user2";
    const userRole2 = "user";

    // Hash passwords
    const hashedAdminPassword1 = await bcrypt.hash(adminPassword1, 14);
    const hashedUserPassword1 = await bcrypt.hash(userPassword1, 14);
    const hashedAdminPassword2 = await bcrypt.hash(adminPassword2, 14);
    const hashedUserPassword2 = await bcrypt.hash(userPassword2, 14);

    // Upsert first admin
    await User.findOneAndUpdate(
      { email: adminEmail1 },
      {
        username: adminUsername1,
        email: adminEmail1,
        password: hashedAdminPassword1,
        role: adminRole1,
      },
      { upsert: true, new: true }
    );

    // Upsert first user
    await User.findOneAndUpdate(
      { email: userEmail1 },
      {
        username: userUsername1,
        email: userEmail1,
        password: hashedUserPassword1,
        role: userRole1,
      },
      { upsert: true, new: true }
    );

    // Upsert second admin
    await User.findOneAndUpdate(
      { email: adminEmail2 },
      {
        username: adminUsername2,
        email: adminEmail2,
        password: hashedAdminPassword2,
        role: adminRole2,
      },
      { upsert: true, new: true }
    );

    // Upsert second user
    await User.findOneAndUpdate(
      { email: userEmail2 },
      {
        username: userUsername2,
        email: userEmail2,
        password: hashedUserPassword2,
        role: userRole2,
      },
      { upsert: true, new: true }
    );

    console.log("All admin and regular users created/updated successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating users:", err);
    mongoose.connection.close();
  }
}

createUsers();
