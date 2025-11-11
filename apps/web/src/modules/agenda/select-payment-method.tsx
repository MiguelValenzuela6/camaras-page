"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card";
import { WalletMinimal, CreditCardIcon, ArrowLeftRight } from "lucide-react";
import { useSaleStore, PaymentMethod } from "@/modules/agenda/store/sale.store";

export function SelectPaymentMethod() {
  const { setMethodPayment, methodPayment } = useSaleStore();

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setMethodPayment(method);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card
        onClick={() => handleSelectPaymentMethod(PaymentMethod.CASH)}
        className={`flex items-center gap-2 py-4 rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.CASH ? "border-2 border-primary-blue" : "border-2"}`}
      >
        <CardHeader className="w-full">
          <CardTitle className="flex items-center gap-2">
            <WalletMinimal className="w-6 h-6" />
            Efectivo
          </CardTitle>
          <CardDescription>
            De esta manera se necesitará que el fotografo confirme el pago al
            momento del evento
          </CardDescription>
        </CardHeader>
      </Card>
      <Card
        onClick={() => handleSelectPaymentMethod(PaymentMethod.NEQUI)}
        className={`flex items-center gap-2 py-4 rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.NEQUI ? "border-2 border-primary-blue" : "border-2"}`}
      >
        <CardHeader className="w-full">
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="w-6 h-6" />
            Tarjeta de crédito
          </CardTitle>
          <CardDescription>
            Pago con tarjeta de crédito, asegura tu cita. No hay cancelación ni
            devolución
          </CardDescription>
        </CardHeader>
      </Card>
      <Card
        onClick={() => handleSelectPaymentMethod(PaymentMethod.NEQUI)}
        className={`flex items-center gap-2 py-4 rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.NEQUI ? "border-2 border-primary-blue" : "border-2"}`}
      >
        <CardHeader className="w-full">
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6" />
            Nequi
          </CardTitle>
          <CardDescription>
            Pago con Nequi, solo funciona para Colombia. No hay cancelación ni
            devolución
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
