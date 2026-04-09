import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    return next();
  } catch (error) {
    if (error.name !== "TokenExpiredError" || !refreshToken) {
      return res.status(401).json({ message: "Authentication invalid" });
    }

    try {
      const refreshPayload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
      const newAccessToken = jwt.sign(
        { userId: refreshPayload.userId, name: refreshPayload.name },
        process.env.JWT_SECRET,
        { expiresIn: "15m" },
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
      });
      req.user = { userId: refreshPayload.userId, name: refreshPayload.name };
      return next();
    } catch (refreshError) {
      return res.status(401).json({ message: "Authentication invalid" });
    }
  }
};
