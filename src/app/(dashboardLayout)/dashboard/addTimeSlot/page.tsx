"use client";

import { teacherService } from "@/services/teachers.service";

export default function page() {
    const handleTimeSlotCreation = async () => {
        const result = teacherService.createTimeSlot({
            startTime: "2021-01-29T09:00:00Z",
            endTime: "2026-01-29T11:00:00Z",
        })
        console.log(result);
    }

    return (
        <div>
            {/* Please add a time slot */}
            <button onClick={handleTimeSlotCreation}>Create Time Slot</button>
        </div>
    );
}