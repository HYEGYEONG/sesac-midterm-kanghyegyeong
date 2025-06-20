import express from 'express';
import { prisma } from '../utils/prisma/index.js';
const authenticateToken = require("../middleware/authentication-middleware");

const router = express.Router();


const jwt = require("jsonwebtoken");
const SECRET_KEY = "sessac";
//할일 등록
router.post('/todos', async (req, res, next) => {
   const { title, description } = req.body;
   //accessToken에서 사용자 아이디 추출
    const userid= "";

    //등록할 할일체크
    if(!title || !description ){
      return res.status(400).json({message : "입력값 확인요청"});

    }

    // 할일 생성
    const newTodos = await prisma.Todos.create({
      data: {
        userId,
        title, 
        description,
      },
    });


    return res.status(201).json({ data: Todos.todoId });
  
});

// 할 일 목록 조회 
router.get('/todos', async (req, res, next) => {
});


