import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

export default {
    //gọi lúc tạo tài khoản để gửi vào email
    createToken: function (data:any, time:any) {
        // time(ms)
        try {
            return jwt.sign(
                data
                ,(process.env.JWT_KEY as string)
                , { expiresIn: `${time}` });
        } catch (err) {
            return false
        }
    },
    //gọi lúc người dùng ấn nút xác nhận trong email
    verifyToken: function(token:any) {
        let result;
        jwt.verify(token, (process.env.JWT_KEY as string), function(err:any, decoded:any) {
            if(err) {
                result = false
            }else {
                result = decoded
            }
        });
        return result
    },
    createTokenforever: function (data:any) {
        // time(ms)
        try {
            return jwt.sign(
                data
                , (process.env.JWT_KEY as string)
                , { expiresIn: `9999 years` });
        } catch (err) {
            return false
        }
    },
}

