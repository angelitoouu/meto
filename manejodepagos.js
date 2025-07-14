// define las rutas para el manejo de pagos
import { Router } from "express";
import {
  getUserPayments,
  makePayment,
  getComprobante,
} from "../controllers/payment.controller.js";
const router = Router();

// Aqui se ven los pagos del usuario y se pueden realizar pagos o ver comprobantes.
router.get("/historial/:userId", getUserPayments);
router.post("/pagar", makePayment);
router.get("/comprobante/:paymentId", getComprobante);

export default router;
