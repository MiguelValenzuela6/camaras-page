"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@camaras/ui/src/components/alert-dialog";
import { Button, buttonVariants } from "@camaras/ui/src/components/button";
import { Trash2 } from "lucide-react";

import { CouponService } from "@/services/coupon-service";
import { useState } from "react";
import { toast } from "sonner";
import { useCoupons } from "@/hooks/use-cupons";

export function AlertDeteleUser({ id, name }: { id: string; name: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useCoupons();

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      await CouponService.delete(id);
      await refetch();
      toast("El usuario ha sido eliminado correctamente", {
        description: "No hay reversiones para esta acción",
        duration: 3000,
      });
    } catch (error) {
      toast("El usuario no se pudo eliminar", {
        description: "Vuelva a intentar o intente más tarde",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={"icon"} className="text-red-400 hover:text-red-500">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de querer eliminar a este usuario{name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Por favor ten cuidado en cual
            usuario quieres eliminar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({
              variant: "default",
            })}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
