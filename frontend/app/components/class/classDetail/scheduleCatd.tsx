"use client";

import { Calendar } from "lucide-react";

interface ScheduleCardProps {
  schedule: string[] | string;
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  const items = Array.isArray(schedule)
    ? schedule
    : schedule.split(";").map((s) => s.trim());

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-500 p-2 sm:p-3 rounded-lg">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="font-bold text-gray-800 text-xl">Class Schedule</h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {items.map((time, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-2 sm:p-3 border-l-4 border-[#0E4BA9]"
          >
            <p className="text-sm sm:text-lg font-semibold text-gray-800">
              {time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
