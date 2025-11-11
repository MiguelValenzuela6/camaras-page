import { create } from "zustand";
import { DaysService } from "@/services/day-service";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  isBooked: boolean;
  availableDayId: string;
}

interface AvailableDay {
  id: string;
  date: string;
  userId: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

interface AvailabilityState {
  availableDays: AvailableDay[];
  selectedDay: AvailableDay | null;
  loading: boolean;
  error: string | null;
  newTimeSlot: {
    start: string;
    end: string;
  };
  actions: {
    setAvailableDays: (days: AvailableDay[]) => void;
    selectDay: (dayId: string) => void;
    toggleDayAvailability: (dayId: string, isAvailable: boolean) => void;
    addTimeSlot: (dayId: string) => Promise<void>;
    removeTimeSlot: (dayId: string, timeSlotId: string) => Promise<void>;
    clearSelectedDay: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setNewTimeSlot: (field: 'start' | 'end', value: string) => void;
    resetNewTimeSlot: () => void;
    saveChanges: (dayId: string) => Promise<void>;
  };
}

export const useAvailabilityStore = create<AvailabilityState>((set, get) => ({
  availableDays: [],
  selectedDay: null,
  loading: false,
  error: null,
  newTimeSlot: {
    start: '09:00',
    end: '10:00'
  },
  actions: {
    setAvailableDays: (days) => set({ availableDays: days }),
    selectDay: (dayId) => 
      set((state) => ({
        selectedDay: state.availableDays.find(day => day.id === dayId) || null
      })),
    toggleDayAvailability: (dayId, isAvailable) =>
      set((state) => ({
        availableDays: state.availableDays.map(day =>
          day.id === dayId ? { ...day, isAvailable } : day
        ),
        selectedDay: state.selectedDay?.id === dayId 
          ? { ...state.selectedDay, isAvailable }
          : state.selectedDay
      })),
    addTimeSlot: async (dayId) => {
      const { newTimeSlot, availableDays } = get();
      const day = availableDays.find(d => d.id === dayId);
      
      if (!day) return;
      
      const newSlot = {
        ...newTimeSlot,
        id: crypto.randomUUID(),
        availableDayId: dayId,
        isBooked: false
      };
      
      set((state) => ({
        availableDays: state.availableDays.map(day =>
          day.id === dayId 
            ? { ...day, timeSlots: [...day.timeSlots, newSlot] } 
            : day
        ),
        selectedDay: state.selectedDay?.id === dayId
          ? { ...state.selectedDay, timeSlots: [...state.selectedDay.timeSlots, newSlot] }
          : state.selectedDay,
        newTimeSlot: { start: '09:00', end: '10:00' }
      }));
    },
    removeTimeSlot: async (dayId, timeSlotId) => {
      set((state) => ({
        availableDays: state.availableDays.map(day =>
          day.id === dayId
            ? { ...day, timeSlots: day.timeSlots.filter(slot => slot.id !== timeSlotId) }
            : day
        ),
        selectedDay: state.selectedDay?.id === dayId
          ? { 
              ...state.selectedDay, 
              timeSlots: state.selectedDay.timeSlots.filter(slot => slot.id !== timeSlotId) 
            }
          : state.selectedDay
      }));
    },
    clearSelectedDay: () => set({ selectedDay: null }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setNewTimeSlot: (field, value) => 
      set((state) => ({ 
        newTimeSlot: { ...state.newTimeSlot, [field]: value } 
      })),
    resetNewTimeSlot: () => 
      set({ newTimeSlot: { start: '09:00', end: '10:00' } }),
    saveChanges: async (dayId) => {
      const { availableDays } = get();
      const day = availableDays.find(d => d.id === dayId);
      
      if (!day) return;
      
      try {
        set({ loading: true });
        
        const timeSlots = day.timeSlots.map(slot => ({
          start: slot.start,
          end: slot.end
        }));
        
        if (day.timeSlots.length > 0) {
          await DaysService.delete(dayId);
        } else {
          await DaysService.create(day.date);
        }
      } catch (error) {
        set({ loading: false, error: 'Error al guardar los cambios' });
      }
    }
  }
}));

export const useAvailabilityActions = () => 
  useAvailabilityStore(state => state.actions);
export const useNewTimeSlot = () => 
  useAvailabilityStore(state => state.newTimeSlot);