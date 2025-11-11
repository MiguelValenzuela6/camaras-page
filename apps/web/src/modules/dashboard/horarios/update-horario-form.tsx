"use client";

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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@camaras/ui/src/components/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@camaras/ui/src/components/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { TimeService } from "@/services/time-service";
import { useState } from "react";

interface Horario {
    id: string;
    start: string;
    end: string;
    ampmStart: string;
    ampmEnd: string;
    availableDayId: string;
}

const updateAppointmentSchema = z.object({
    startHour: z.string().length(2),
    startMinute: z.string().length(2),
    startPeriod: z.enum(["AM", "PM"]),
    endHour: z.string().length(2),
    endMinute: z.string().length(2),
    endPeriod: z.enum(["AM", "PM"]),
});

export function UpdateHorarioForm({ horario }: { horario: Horario }) {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { data, refetch } = useDayById(id as string);
    
    const form = useForm<z.infer<typeof updateAppointmentSchema>>({
        resolver: zodResolver(updateAppointmentSchema),
        defaultValues: {
            startHour: horario.start.split(":")[0],
            startMinute: horario.start.split(":")[1],
            startPeriod: horario.ampmStart as "AM" | "PM",
            endHour: horario.end.split(":")[0],
            endMinute: horario.end.split(":")[1],
            endPeriod: horario.ampmEnd as "AM" | "PM",
        },
    })

    const to24Hour = (hour: string, minute: string, period: string) => {
        let h = Number.parseInt(hour, 10);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${minute}`;
    };

    async function onSubmit(values: z.infer<typeof updateAppointmentSchema>) {
        try {
            setIsLoading(true);

            const startTime = to24Hour(values.startHour, values.startMinute, values.startPeriod);
            const endTime = to24Hour(values.endHour, values.endMinute, values.endPeriod);

            if (startTime >= endTime) {
                toast.error("La hora de inicio debe ser anterior a la hora de fin");
                return;
            }

            if (data?.timeSlots.some((slot) => slot.start === startTime)) {
                toast.error("La hora de inicio ya existe");
                return;
            }

            await TimeService.update([{
                id: horario.id,
                startTime,
                endTime,
                ampmStart: values.startPeriod,
                ampmEnd: values.endPeriod,
                availableDayId: id as string,
            }]);

            await refetch();
            toast.success("Horario actualizado exitosamente");
        } catch (error) {
            console.log(error);
            toast.error("Error al actualizar el horario");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex items-center flex-col">
                <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hora de inicio</FormLabel>
                            <InputOTP
                                {...field}
                                maxLength={2}
                                placeholder="00"
                                className="w-[50px]"
                            >
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTP>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="startMinute"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minuto de inicio</FormLabel>
                            <InputOTP
                                {...field}
                                maxLength={2}
                                placeholder="00"
                                className="w-[50px]"
                            >
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTP>
                                <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="startPeriod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Periodo de inicio</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un periodo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endHour"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hora de fin</FormLabel>
                            <InputOTP
                                {...field}
                                maxLength={2}
                                placeholder="00"
                                className="w-[50px]"
                            >
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTP>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    
                <FormField
                    control={form.control}
                    name="endMinute"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minuto de fin</FormLabel>
                            <InputOTP
                                {...field}
                                maxLength={2}
                                placeholder="00"
                                className="w-[50px]"
                            >
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTP>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="endPeriod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Periodo de fin</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un periodo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? "Actualizando..." : "Actualizar"}
                </Button>
            </form>
        </Form>
    );
}