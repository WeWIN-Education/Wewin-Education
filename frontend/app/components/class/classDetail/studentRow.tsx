import { ACTIONS } from "@/types/icon";
import { calculateAge } from "@/app/utils/date";

export function StudentRow({
  student,
  index,
}: {
  student: any;
  index: number;
}) {
  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
      } hover:bg-gray-50
      text-black
      `}
    >
      <td className="cell text-[#0E4BA9]">{student.id}</td>
      <td className="cell font-semibold">{student.name}</td>
      <td className="cell">{calculateAge(new Date(student.dob))}</td>
      <td className="cell">{student.gender}</td>
      <td className="cell">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {student.status}
        </span>
      </td>
      <td className="cell">
        <div className="flex gap-2">
          {ACTIONS.map(({ icon: Icon, className, label }) => (
            <button
              key={label}
              className={`p-2 rounded-lg text-white shadow-sm transition hover:scale-105 active:scale-95 ${className}`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}
