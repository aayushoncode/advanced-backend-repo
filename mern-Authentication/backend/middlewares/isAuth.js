import jwt from "jsonwebtoken";
import { redis_client } from "../index.js";
import User from "../model/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(403).json({
        message: "please login, no access token",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      res.status(400).json({
        message: "token expired",
      });
    }

    const cacheUser = await redis_client.get(`user${decodedData.id}`);

    if (cacheUser) {
      req.user = JSON.parse(cacheUser);
      return next();
    }

    const user = await User.findById(decodedData.id).select("-password");

    if (!user) {
      res.status(400).json({
        message: "no user with this id ",
      });
    }

    await redis_client.setEx(`user:${user._id}`, 3600, JSON.stringify(user));

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "internal server error ",
      err: `${error.message}`,
    });
  }
};
