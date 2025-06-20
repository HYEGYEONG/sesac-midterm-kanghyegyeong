// routes/users.router.js

import express from 'express';
import { prisma } from '../util/prisma/index.js';
const authenticateToken = require("../middleware/authentication-middleware");

const router = express.Router();


const jwt = require("jsonwebtoken");
const SECRET_KEY = "sessac";

// 사용자 생성 API
router.post('/auth/signup', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if(!email || !password || !username){
      return res.status(409).json({message : "입력값 확인요청"});

    }
    // 이메일 중복 확인
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    // 새 사용자 생성
    const newUser = await prisma.users.create({
      data: {
        email,
        password, // 실제 서비스에서는 비밀번호를 해싱해야 합니다.
        username,
      },
    });

    // 비밀번호는 응답에서 제외
    const { password: _, ...userData } = newUser;

    return res.status(201).json({ message: '회원가입이 완료되었습니다.', data: newUser.userid });
  } catch (error) {
    next(error); // 에러 미들웨어로 전달
  }
});


//로그인
router.post('/auth/login', async (req, res, next) => {
    const {email, password} =req.body;

    if(!email || !password ){
      return res.status(409).json({message : "입력값 확인요청"});

    }

     // 이메일 중복 확인
    const loginUser = await prisma.users.findUnique({
      where: { email,password },
    });
    
    if (loginUser) {//로그인성공시 
      
      //로그인 토큰 생성
      const accessToken = jwt.sign(user, SECRET_KEY, {
        expiresIn: "10s", 
     });
      return res.status(200).json({ accessToken: accessToken });
    }
    else//로그인 실패
    {
       return res.status(401).json({ message : "로그인이 실패하였습니다."});
    }

});
