const express = require('express');
const router = express.Router();
const Common = require("../middleware/common.middleware")
const {
  fetch,
  create,
  update,
  fetchById,
  remove
} = require("../controller/common.controller")

router.get('/', Common, fetch);
router.get("/:id", Common, fetchById)
router.post("/", Common, create);
router.put("/:id", Common, update);
router.delete("/:id", Common, remove)
module.exports = router;
