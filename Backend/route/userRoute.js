import express from "express";
import { usermodModel, propertyModel, buyerModel } from "../model/table.js";

const router = express.Router();

// =========================
// ✅ User Register
// =========================
router.post("/user-register", async (req, res) => {
  try {
    const { name, email, password, contact, address } = req.body;
    const { profile } = req.files || {};

    const isExist = await usermodModel.findOne({ email });
    if (isExist) {
      return res.json({
        code: 400,
        message: "User already exist",
        data: isExist,
      });
    }

    if (profile) {
      await profile.mv("uploads/" + profile.name);
    }

    const data = new usermodModel({
      name,
      email,
      password,
      contact,
      address,
      profile: profile?.name || "",
    });

    const result = await data.save();
    return res.json({
      code: 200,
      message: "User Register Successfully",
      data: result,
    });
  } catch (err) {
    return res.json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

// =========================
// ✅ User Update
// =========================
router.put("/user-update", async (req, res) => {
  try {
    const { name, email, password, contact, address, userId } = req.body;
    const { profile } = req.files || {};

    let updateData = { name, email, password, contact, address };

    if (profile) {
      await profile.mv("uploads/" + profile.name);
      updateData.profile = profile.name;
    }

    const result = await usermodModel.findByIdAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );

    if (!result) {
      return res.json({
        code: 400,
        message: "User Update Failed",
        data: null,
      });
    }

    return res.json({
      code: 200,
      message: "User Updated Successfully",
      data: result,
    });
  } catch (err) {
    return res.json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

// =========================
// ✅ Login
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isLogin = await usermodModel.findOne({ email, password });

    if (!isLogin) {
      return res.json({
        code: 400,
        message: "Invalid Credentials",
        data: null,
      });
    }

    return res.json({
      code: 200,
      message: "Login Successfully",
      data: isLogin,
    });
  } catch (err) {
    return res.json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

// =========================
// ✅ Buy Property
// =========================
router.post("/buy", async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    const isSold = await buyerModel.findOne({ propertyId });

    if (isSold) {
      return res.json({
        code: 400,
        message: "Property Already Sold",
        data: isSold,
      });
    }

    const data = new buyerModel({ userId, propertyId });
    const result = await data.save();

    return res.json({
      code: 200,
      message: "Property Bought Successfully",
      data: result,
    });
  } catch (err) {
    return res.json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

// =========================
// ✅ User Bought List
// =========================
router.post("/user-bought-list", async (req, res) => {
  try {
    const { userId } = req.body;
    const raw = await buyerModel.find({ userId });

    const finalData = await Promise.all(
      raw.map(async (item) => {
        const propertyData = await propertyModel.findOne({
          _id: item.propertyId,
        });
        return {
          _id: item._id,
          propertyId: propertyData?._id,
          title: propertyData?.title,
          price: propertyData?.price,
          area: propertyData?.area,
          location: propertyData?.location,
          description: propertyData?.description,
          pic: propertyData?.pic,
        };
      })
    );

    return res.json({
      code: 200,
      message: "Data fetched successfully",
      data: finalData,
    });
  } catch (err) {
    return res.json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

export default router;
