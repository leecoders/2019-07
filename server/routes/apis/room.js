const express = require('express');
const {
  isRoomExist,
  isRoomNumberValid,
  isValidNickname,
  isNicknameOverlap,
} = require('../../middleware/validations');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    isError: true,
    message: '방 번호를 입력하세요.',
  });
});

/**
 * @api {get} /room/:roomNumber 유효한 방인지 확인 요청
 * @apiName checkValidRoomNumber
 * @apiGroup room
 *
 * @apiParam {String} roomNumber 방의 고유한 6자리 번호.
 *
 * @apiSuccess {boolean} isSuccess 방을 들어갈 수 있는지 여부
 * @apiSuccess {String} message 오류가 발생한 경우, 오류 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: true,
 *     }
 *
 * @apiSuccessExample 열리지 않는 방에 접근함
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: false,
 *       message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요.',
 *     }
 */
router.get('/:roomNumber', isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isSuccess: true,
  });
});

router.get('/:roomNumber/name', isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isError: true,
    message: '닉네임을 입력하세요.',
  });
});

/**
 * @api {get} /room/:roomNumber/:nickname 방에서 유효한 닉네임인지 확인 요청
 * @apiName checkValidNickname
 * @apiGroup room
 *
 * @apiParam {String} roomNumber 방의 고유한 6자리 번호.
 * @apiParam {String} nickname 유저가 입력한 닉네임.
 *
 * @apiSuccess {boolean} isSuccess 입력한 닉네임으로 방을 들어갈 수 있는지 여부
 * @apiSuccess {String} message 오류가 발생한 경우, 오류 메시지
 */
router.get(
  '/:roomNumber/name/:nickname',
  isRoomNumberValid,
  isRoomExist,
  isValidNickname,
  isNicknameOverlap,
  (req, res) => {
    res.json({
      isSuccess: true,
    });
  },
);

module.exports = router;
