"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import { Button } from "@camaras/ui/src/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@camaras/ui/src/components/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { TimeService } from "@/services/time-service";
import { PlusIcon, TrashIcon } from "lucide-react";

// Zod Schema
const createAppointmentSchema = z.object({
  startHour: z.string().min(1, "Hora requerida"),
  startMinute: z.string().min(1, "Minuto requerido"),
  startPeriod: z.enum(["AM", "PM"]),
  endHour: z.string().min(1, "Hora requerida"),
  endMinute: z.string().min(1, "Minuto requerido"),
  endPeriod: z.enum(["AM", "PM"]),
});

export function CreateHorarioForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [horarios, setHorarios] = useState<Array<z.infer<typeof createAppointmentSchema>>>([]);
  const { id } = useParams();
  const { data, refetch } = useDayById(id as string);

  const form = useForm<z.infer<typeof createAppointmentSchema>>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      startHour: "",
      startMinute: "",
      startPeriod: "AM",
      endHour: "",
      endMinute: "",
      endPeriod: "AM",
    },
  });

  // Generar opciones de horas (01-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = String(i + 1).padStart(2, "0");
    return { value: hour, label: hour };
  });

  // Generar opciones de minutos (00, 15, 30, 45)
  const minuteOptions = [
    { value: "00", label: "00" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
  ];

  // Utilidad para convertir a formato 24h
  const to24Hour = (hour: string, minute: string, period: string) => {
    let h = Number.parseInt(hour, 10);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  // Utilidad para convertir de 24h a 12h
  const to12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    let hour = Number.parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return `${String(hour).padStart(2, '0')}:${minutes} ${period}`;
  };

  // Agregar horario a la lista temporal
  const addHorario = (values: z.infer<typeof createAppointmentSchema>) => {
    const startTime = to24Hour(values.startHour, values.startMinute, values.startPeriod);
    const endTime = to24Hour(values.endHour, values.endMinute, values.endPeriod);

    if (startTime >= endTime) {
      toast.error("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    // Verificar si ya existe en los horarios temporales
    const exists = horarios.some(h => {
      const existingStart = to24Hour(h.startHour, h.startMinute, h.startPeriod);
      return existingStart === startTime;
    });

    // Verificar si ya existe en el servidor
    if (data?.timeSlots.some((slot) => slot.start === startTime)) {
      toast.error("La hora de inicio ya existe");
      return;
    }

    if (exists) {
      toast.error("Este horario ya está en la lista");
      return;
    }

    setHorarios([...horarios, values]);
    form.reset({
      startHour: "",
      startMinute: "",
      startPeriod: "AM",
      endHour: "",
      endMinute: "",
      endPeriod: "AM",
    });
    toast.success("Horario agregado a la lista");
  };

  // Eliminar horario de la lista temporal
  const removeHorario = (index: number) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };

  // Guardar todos los horarios
  async function onSubmit() {
    if (horarios.length === 0) {
      toast.error("Agrega al menos un horario");
      return;
    }

    try {
      setIsLoading(true);

      // Preparar todos los horarios como array
      const timeSlots = horarios.map(horario => {
        const startTime = to24Hour(horario.startHour, horario.startMinute, horario.startPeriod);
        const endTime = to24Hour(horario.endHour, horario.endMinute, horario.endPeriod);

        return {
          startTime,
          endTime,
          ampmStart: horario.startPeriod,
          ampmEnd: horario.endPeriod,
          availableDayId: id as string,
        };
      });

      // Crear todos los horarios de una vez
      await TimeService.create(timeSlots);

      await refetch();
      setHorarios([]);
      toast.success("Horarios creados exitosamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al crear los horarios");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Registro de Horarios Disponibles</h3>
        <p className="text-sm text-gray-600 mb-4">Ingresa los horarios disponibles en formato de 12 horas</p>

        {/* Formulario de entrada */}
        <Form {...form}>
          <div className="grid grid-cols-2 gap-6">
            {/* Hora de Inicio */}
            <div className="space-y-2">
              <FormLabel>Hora de Inicio</FormLabel>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="startHour"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="09" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>:</span>
                <FormField
                  control={form.control}
                  name="startMinute"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="00" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Hora de Fin */}
            <div className="space-y-2">
              <FormLabel>Hora de fin</FormLabel>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="endHour"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="05" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>:</span>
                <FormField
                  control={form.control}
                  name="endMinute"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="30" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={form.handleSubmit(addHorario)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Form>

        {/* Botón de agregar nuevo horario */}
        <div className="mt-4 text-center">
          <Button
            type="button"
            variant="outline"
            onClick={form.handleSubmit(addHorario)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Agregar nuevo horario
          </Button>
        </div>

        {/* Resumen de horarios */}
        {horarios.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Resumen de horarios:</h4>
            <div className="space-y-2">
              {horarios.map((horario, index) => {
                const startTime = to24Hour(horario.startHour, horario.startMinute, horario.startPeriod);
                const endTime = to24Hour(horario.endHour, horario.endMinute, horario.endPeriod);
                const display = `${to12Hour(startTime)} - ${to12Hour(endTime)}`;

                return (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <span>{display}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeHorario(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Botón de guardar */}
        <div className="mt-6">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || horarios.length === 0}
            className="w-full"
          >
            {isLoading ? "Guardando horarios..." : "Guardar horarios"}
          </Button>
        </div>
      </div>
    </div>
  );
}