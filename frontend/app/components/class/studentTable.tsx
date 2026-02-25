"use client";

import React, { useState } from "react";
import ReusableTable from "@/app/components/table";
import { STUDENT_HEADERS } from "@/lib/constants/class";
import { calculateAge } from "@/app/utils/date";
import { StatusBadge } from "@/app/components/status";
import { Pagination, RowsPerPage } from "@/app/components/pagination";

interface Student {
  id: string;
  name: string;
  dob: string;
  gender: string;
  status: string;
}

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(5);

  const total = students.length;
  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(total / (rowsPerPage as number));

  const startIndex =
    rowsPerPage === "all" ? 0 : (page - 1) * (rowsPerPage as number);

  const visibleStudents =
    rowsPerPage === "all"
      ? students
      : students.slice(startIndex, startIndex + (rowsPerPage as number));

  return (
    <div className="space-y-3">
      <ReusableTable<Student>
        columns={STUDENT_HEADERS}
        data={visibleStudents}
        getKey={(stu) => stu.id}
        /* ===== DESKTOP ROW ===== */
        renderRow={(stu) => (
          <>
            <td className="px-5 py-3 text-[#0E4BA9] font-semibold">{stu.id}</td>
            <td className="px-5 py-3">{stu.name}</td>
            <td className="px-5 py-3">{calculateAge(new Date(stu.dob))}</td>
            <td className="px-5 py-3">{stu.gender}</td>
            <td className="px-5 py-3">
              <StatusBadge status={stu.status} />
            </td>
          </>
        )}
        /* ===== MOBILE CARD ===== */
        renderMobileCard={(stu) => (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-[#0E4BA9]">#{stu.id}</span>
              <StatusBadge status={stu.status} />
            </div>

            <div className="text-sm">
              <div>
                <span className="font-medium">Tên:</span> {stu.name}
              </div>
              <div>
                <span className="font-medium">Tuổi:</span>{" "}
                {calculateAge(new Date(stu.dob))}
              </div>
              <div>
                <span className="font-medium">Giới tính:</span> {stu.gender}
              </div>
            </div>
          </div>
        )}
        /* ===== ACTIONS ===== */
        actions={{
          onView: (stu) => console.log("View", stu),
          onEdit: (stu) => console.log("Edit", stu),
          onDisable: (stu) => console.log("Disable", stu),
        }}
      />

      {/* ===== PAGINATION ===== */}
      <Pagination
        text="Students"
        currentPage={page}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={Math.min(startIndex + (rowsPerPage as number), total)}
        total={total}
        selectedRows={rowsPerPage}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => (p < totalPages ? p + 1 : p))}
        onRowsChange={(rows) => {
          setRowsPerPage(rows);
          setPage(1);
        }}
      />
    </div>
  );
}
