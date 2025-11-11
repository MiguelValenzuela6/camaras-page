"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@camaras/ui/src/components/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@camaras/ui/src/components/sheet";
import { useSales } from "@/hooks/use-sale";
import { Eye, Loader2, Trash2Icon } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import { useState } from "react";
import { SaleService } from "@/services/sale-service";
import { VentasDetalles } from "./ventas-detalles";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@camaras/ui/src/components/alert-dialog";
import { formatCurrency } from "@/utils/format-currency";

export const TableVentas = () => {
  const { data, isLoading, isError, refetch } = useSales();
  const [selectedSale, setSelectedSale] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleViewDetails = (saleId: string) => {
    setSelectedSale(saleId);
    setOpenSheet(true);
  };

  const sales = data?.sales || [];

  return (
    <>
      <Table className="w-full rounded-lg overflow-hidden">
        <TableHeader className="bg-sidebar-accent w-full">
          <TableRow className="w-full">
            <TableHead className="min-w-[100px] text-left">Id</TableHead>
            <TableHead className="min-w-[100px] text-center">
              Comprador
            </TableHead>
            <TableHead className="min-w-[100px] text-center">Estado</TableHead>
            <TableHead className="min-w-[100px] text-center">Paquete</TableHead>
            <TableHead className="min-w-[100px] text-center">Precio</TableHead>
            <TableHead className="min-w-[100px] text-center">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Cargando ventas...
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Error al cargar las ventas
              </TableCell>
            </TableRow>
          ) : sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="text-left">
                  {sale.id.slice(0, 8)}...
                </TableCell>
                <TableCell className="text-center">{sale.buyerName}</TableCell>
                <TableCell className="text-center">{sale.status}</TableCell>
                <TableCell className="text-center">
                  {sale.packageName}
                </TableCell>
                <TableCell className="text-center">$ {formatCurrency(sale.price)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleViewDetails(sale.id)}
                  >
                    <Eye />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={sale.status !== "PENDING"}
                    className="text-red-500 hover:text-red-600"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No hay ventas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Sheet para Ver más */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalles de la venta</SheetTitle>
            <SheetDescription>
              Información detallada de la venta seleccionada.
            </SheetDescription>
          </SheetHeader>

          {selectedSale && <VentasDetalles saleId={selectedSale} buyerName={selectedSale} />}
        </SheetContent>
      </Sheet>

      {/* Alert Dialog para Cancelar */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la venta
              seleccionada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
