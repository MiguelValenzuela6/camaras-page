import { apiClient } from "@/utils/api-connection";

interface TimeSlotData {
  startTime: string;
  endTime: string;
  ampmStart: string;
  ampmEnd: string;
  availableDayId: string;
}

interface UpdateTimeSlotData extends TimeSlotData {
  id: string;
}

export const TimeService = {
  create: async (timeSlots: TimeSlotData[]) => {
    const response = await apiClient.time.index.post(
      { timeSlots },
      {
        fetch: {
          credentials: "include",
        },
      },
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.time({ id }).delete(null, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  update: async (timeSlots: UpdateTimeSlotData[]) => {
    const response = await apiClient.time.index.patch(
      { timeSlots },
      {
        fetch: {
          credentials: "include",
        },
      },
    );
    return response.data;
  },
};
