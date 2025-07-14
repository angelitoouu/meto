// src/utils/notificaciones.js
import { AppDataSource } from "../config/configDb.js";
import { Payment } from "../models/payment.model.js";
 
// Esto es para revisar si hay pagos próximos a vencer o vencidos.
export const checkUpcomingOrOverduePayments = async () => {
  const paymentRepo = AppDataSource.getRepository(Payment);
  const hoy = new Date();

  // Obtiene todos los pagos  y filtra los que están pendientes o vencidos
  const pagos = await paymentRepo.find();
  const notificaciones = pagos
    .filter(p => p.status === "pendiente")
    .map(p => {
      const diff = (new Date(p.dueDate) - hoy) / (1000 * 60 * 60 * 24);

      // Si el pago está vencido o próximo a vencer, agrega una alerta
      if (diff < 0) return { ...p, alerta: "Pago vencido" };
      if (diff < 3) return { ...p, alerta: "Pago próximo a vencer" };
      return null;
    }).filter(Boolean);

  return notificaciones;
};
