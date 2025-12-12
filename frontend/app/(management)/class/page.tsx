"use client";

import React, { useState } from "react";
import ClassTable from "@/app/components/class/classTable";
import { Class, initialData } from "@/app/constants/class";
import {
  Pagination,
  ROWS_PER_PAGE,
  RowsPerPage,
} from "@/app/components/pagination";

export default function ClassPage() {
  const [data] = useState<Class[]>(initialData);

  /* --------------------------------------------- */
  /* CLASS LIST PAGINATION (desktop + mobile outer) */
  /* --------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(10);

  const totalClasses = data.length;
  const totalPages =
    rowsPerPage === "all"
      ? 1
      : Math.ceil(totalClasses / (rowsPerPage as number));

  const startIndex =
    rowsPerPage === "all" ? 0 : (currentPage - 1) * (rowsPerPage as number);

  const endIndex =
    rowsPerPage === "all" ? totalClasses : startIndex + (rowsPerPage as number);

  const displayedClasses = data.slice(startIndex, endIndex);

  /* --------------------------------------------- */
  /* EXPAND STATE */
  /* --------------------------------------------- */
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* --------------------------------------------- */
  /* STUDENT PAGINATION FOR EACH CLASS */
  /* --------------------------------------------- */
  const [studentPagination, setStudentPagination] = useState<{
    [classId: string]: { page: number; rows: RowsPerPage };
  }>({});

  const updateStudentPagination = (
    id: string,
    patch: { page?: number; rows?: RowsPerPage }
  ) => {
    setStudentPagination((prev) => ({
      ...prev,
      [id]: {
        page: patch.page ?? prev[id]?.page ?? 1,
        rows: patch.rows ?? prev[id]?.rows ?? 5,
      },
    }));
  };

  /* --------------------------------------------- */
  /* MOBILE MENU STATE */
  /* --------------------------------------------- */
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /* --------------------------------------------- */
  /* ACTION HANDLERS */
  /* --------------------------------------------- */
  const handleViewClass = (cls: Class) => console.log("View:", cls);
  const handleEditClass = (cls: Class) => console.log("Edit:", cls);
  const handleCancelClass = (cls: Class) => console.log("Cancel:", cls);

  /* --------------------------------------------- */
  /* CLASS TABLE PAGINATION HANDLERS */
  /* --------------------------------------------- */
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "all" ? "all" : Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#0E4BA9] mb-6">
        Class Management
      </h1>

      {/* CLASS TABLE */}
      <ClassTable
        data={displayedClasses}
        expanded={expanded}
        studentPagination={studentPagination}
        openMenu={openMenu}
        onExpand={toggleExpand}
        onMenuToggle={setOpenMenu}
        updateStudentPagination={updateStudentPagination}
        onView={handleViewClass}
        onEdit={handleEditClass}
        onCancel={handleCancelClass}
      />

      {/* OUTER PAGINATION FOR CLASS LIST */}
      <Pagination
        text="Classes"
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        total={totalClasses}
        selectedRows={rowsPerPage}
        onPrev={handlePrev}
        onNext={handleNext}
        onRowsChange={handleRowsChange}
      />
    </div>
  );
}
