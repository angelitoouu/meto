import { AppDataSource } from "../config/configDb.js";
import { Payment } from "../models/payment.model.js";

const paymentRepo = AppDataSource.getRepository(Payment);

// Esto es para ver el historial de pagos del usuario.
export const getUserPayments = async (req, res) => {
  const { userId } = req.params;
  const pagos = await paymentRepo.find({ where: { userId } });
  res.json(pagos);
};

// Esta función es para realizar un pago.
export const makePayment = async (req, res) => {
  const { userId, paymentId, method } = req.body;

  const pago = await paymentRepo.findOne({ where: { id: paymentId, userId } });

  if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

  if (pago.status === "pagado")
    return res.status(400).json({ message: "Este pago ya fue realizado" });

  // Verifica si el pago está pendiente 
  pago.status = "pagado";
  pago.paidDate = new Date();
  pago.method = method;

  await paymentRepo.save(pago);
  res.json({ message: "Pago realizado con éxito", pago });
};

// Esto es para obtener el comprobante de un pago.
export const getComprobante = async (req, res) => {
  const { paymentId } = req.params;
  const pago = await paymentRepo.findOne({ where: { id: paymentId } });

  if (!pago || pago.status !== "pagado") {
    return res.status(404).json({ message: "Pago no encontrado o no completado" });
  }

  // Genera el comprobante del pago 
  res.json({
    comprobante: {
      numero: pago.id,
      monto: pago.amount,
      fecha: pago.paidDate,
      metodo: pago.method,
    },
  });
};
export default {
  getUserPayments,
  makePayment,
  getComprobante,
};      