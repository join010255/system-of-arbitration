import jwt from "jsonwebtoken";


const validationRefreshToken = async(req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token required"
        });
    }

    try {

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
            {
                id: decoded.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.json({
            accessToken: newAccessToken
        });

    } catch (err) {

        return res.status(403).json({
            message: "Invalid or expired refresh token"
        });

    }
}

export default validationRefreshToken;