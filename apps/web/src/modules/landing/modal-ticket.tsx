import { Button } from "@camaras/ui/src/components/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@camaras/ui/src/components/dialog";
import Image from "next/image";

interface TicketData {
  ticketNumber: string;
  packageName: string;
  packagePrice: string;
  photographerName: string;
  photographerEmail: string;
  sessionDate: string;
  sessionTime: string;
  status: 'no-pago' | 'abonado' | 'pagado';
  imageUrl?: string;
}

interface ModalTicketProps {
  ticketData?: TicketData;
}

export default function ModalTicket({ ticketData }: ModalTicketProps) {
  // Datos de prueba para el ticket
  const mockTicketData: TicketData = {
    ticketNumber: "TKT-2024-001",
    packageName: "Sesión Cosplay Premium",
    packagePrice: "$2,500",
    photographerName: "María González",
    photographerEmail: "maria@gmail.com",
    sessionDate: "15 de Marzo 2024",
    sessionTime: "10:00 AM",
    status: 'pagado',
    imageUrl: "/images/slider-hero/1.webp"
  };

  // Usar datos de prueba si no se proporcionan datos reales
  const displayData = ticketData || mockTicketData;

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="landing" className="absolute inset-y-0 right-1 top-1 bottom-1 px-4 py-1 rounded-md bg-[#00FFF0] text-black font-medium hover:bg-[#00FFF0]/90 transition-colors text-sm cursor-pointer">
            Consultar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-0 bg-transparent border-none">
          {/* Ticket blanco */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Header con número de ticket */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4">
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    {displayData.photographerName}
                  </h2>
                  <p className="text-sm opacity-90">
                    Fotógrafo Profesional
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-75">Ticket</p>
                  <p className="text-lg font-bold">
                    #{displayData.ticketNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="w-full h-40 relative">
              {displayData.imageUrl ? (
                <Image
                  src={displayData.imageUrl}
                  alt="Servicio de fotografía"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Imagen del servicio</span>
                </div>
              )}
            </div>


            {/* Detalles del ticket */}
            <div className="p-4 space-y-3">
              {/* Datos del comprador */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-slate-800">
                    {displayData.photographerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-slate-800">
                    {displayData.photographerEmail}
                  </p>
                </div>
              </div>

              {/* Paquete y precio */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Paquete</p>
                  <p className="font-semibold text-slate-800">
                    {displayData.packageName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Precio</p>
                  <p className="text-xl font-bold text-slate-800">
                    {displayData.packagePrice}
                  </p>
                </div>
              </div>

              {/* Fecha y hora */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="font-semibold text-slate-800">
                    {displayData.sessionDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hora</p>
                  <p className="font-semibold text-slate-800">
                    {displayData.sessionTime}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${displayData.status === 'pagado'
                  ? 'bg-green-100 text-green-800'
                  : displayData.status === 'abonado'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {displayData.status === 'pagado' ? '✅ Pagado' :
                    displayData.status === 'abonado' ? '⏳ Abonado' :
                      '❌ No Pagado'}
                </div>
              </div>

              {/* Línea perforada */}
              <div className="border-t-2 border-dashed border-gray-300 my-4" />

              {/* Footer con código de barras y botones */}
              <div className="flex items-center justify-center">

                {/* Botones */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="px-3 py-1 text-xs  bg-[#00FFF0] text-black hover:bg-[#00FFF0]/90"
                  >
                    <DialogClose>Ver Detalles</DialogClose>
                  </Button>
                  <Button
                    asChild
                    className="px-3 py-1 text-xs bg-slate-600 hover:bg-slate-700 text-white"
                    variant="outline"
                  >
                    <DialogClose>Aceptar</DialogClose>
                  </Button>
                </div>
              </div>
            </div>
          </div>


        </DialogContent>
      </Dialog>
    </>
  );
}