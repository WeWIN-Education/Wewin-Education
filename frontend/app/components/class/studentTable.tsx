"use client";

import React, { useState } from "react";
import { StatusBadge } from "@/app/components/status";
import ReusableTable from "@/app/components/table";
import { STUDENT_HEADERS } from "@/lib/constants/class";
import { calculateAge } from "@/app/utils/date";
import { Ban, Edit, Eye } from "lucide-react";
import { Pagination, RowsPerPage } from "@/app/components/pagination";

interface StudentTableProps {
  students: any[];
}

export default function StudentTable({ students }: StudentTableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(5);

  const totalStudents = students.length;

  const totalPages =
    rowsPerPage === "all"
      ? 1
      : Math.ceil(totalStudents / (rowsPerPage as number));

  const startIndex =
    rowsPerPage === "all" ? 0 : (page - 1) * (rowsPerPage as number);

  const endIndex =
    rowsPerPage === "all"
      ? totalStudents
      : startIndex + (rowsPerPage as number);

  const visibleStudents =
    rowsPerPage === "all"
      ? students
      : students.slice(startIndex, endIndex);

  return (
    <div className="space-y-3">
      {/* <ReusableTable
        columns={STUDENT_HEADERS}
        data={visibleStudents}
        renderRow={(stu) => (
          <>
            <td className="px-5 py-3 text-[#0E4BA9] font-semibold">
              {stu.id}
            </td>
            <td className="px-5 py-3">{stu.name}</td>
            <td className="px-5 py-3">
              {calculateAge(new Date(stu.dob))}
            </td>
            <td className="px-5 py-3">{stu.gender}</td>
            <td className="px-5 py-3">
              <StatusBadge status={stu.status} />
            </td>
            <td className="px-5 py-3 text-center">
              <div className="flex justify-left gap-2">
                <button className="p-2 rounded-md bg-blue-500 text-white">
                  <Eye size={16} />
                </button>
                <button className="p-2 rounded-md bg-yellow-500 text-white">
                  <Edit size={16} />
                </button>
                <button className="p-2 rounded-md bg-orange-500 text-white">
                  <Ban size={16} />
                </button>
              </div>
            </td>
          </>
        )}
      /> */}

      {/* Pagination cho student list */}
      <Pagination
      text="Students"
        currentPage={page}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        total={totalStudents}
        selectedRows={rowsPerPage}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() =>
          setPage((p) => (p < totalPages ? p + 1 : p))
        }
        onRowsChange={(e) => {
          const value =
            e.target.value === "all" ? "all" : Number(e.target.value);
          setRowsPerPage(value);
          setPage(1);
        }}
      />
    </div>
  );
}
