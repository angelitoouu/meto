import { EntitySchema } from "typeorm";

export const Payment = new EntitySchema({
  name: "Payment",
  tableName: "payments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "int",
    },
    amount: {
      type: "float",
    },
    dueDate: {
      type: "date",
    },
    paidDate: {
      type: "date",
      nullable: true,
    },
    status: {
      type: "varchar",
      default: "pendiente", // pagado | pendiente | vencido
    },
    method: {
      type: "varchar",
      nullable: true,
    },
  },
});
export default Payment;