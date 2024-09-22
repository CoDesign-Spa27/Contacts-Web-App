"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controller/contactController");
const router = (0, express_1.Router)();
router.get('/', contactController_1.getContacts);
router.get('/:id', contactController_1.getContact);
router.post('/:id/send-otp', contactController_1.sendOtp);
exports.default = router;
