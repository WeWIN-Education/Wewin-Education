"use client";

import React, { useState } from "react";
import ClassTable from "@/app/components/class/classTable";
import { Class, initialData } from "@/lib/constants/class";
import {
  Pagination,
  RowsPerPage,
} from "@/app/components/pagination";

import { CirclePlus } from "lucide-react";
import EditClassForm from "@/app/components/class/classForm";
import Button from "@/app/components/button";
import SearchInput from "@/app/components/search";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/constants/routes";

export default function ClassPage() {
  const router = useRouter();

  const [data, setData] = useState<Class[]>(initialData);

  /* ------------------------------- SEARCH ------------------------------- */
  const [search, setSearch] = useState("");

  const filtered = data.filter((cls) => {
    const query = search.toLowerCase();
    return (
      cls.name.toLowerCase().includes(query) ||
      cls.category.toLowerCase().includes(query) ||
      cls.teacher1?.toLowerCase().includes(query)
    );
  });

  /* ------------------------- PAGINATION CLASS LIST ---------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(10);

  const totalClasses = filtered.length;
  const totalPages =
    rowsPerPage === "all"
      ? 1
      : Math.ceil(totalClasses / (rowsPerPage as number));

  const startIndex =
    rowsPerPage === "all" ? 0 : (currentPage - 1) * (rowsPerPage as number);

  const endIndex =
    rowsPerPage === "all" ? totalClasses : startIndex + (rowsPerPage as number);

  const displayedClasses = filtered.slice(startIndex, endIndex);

  /* ------------------------------- EXPANDED ----------------------------- */
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ------------------------- STUDENT PAGINATION ------------------------- */
  const [studentPagination, setStudentPagination] = useState<{
    [classId: string]: { page: number; rows: RowsPerPage };
  }>({});

  const updateStudentPagination = (id: string, patch: any) => {
    setStudentPagination((prev) => ({
      ...prev,
      [id]: {
        page: patch.page ?? prev[id]?.page ?? 1,
        rows: patch.rows ?? prev[id]?.rows ?? 5,
      },
    }));
  };

  /* ------------------------------- MOBILE MENU -------------------------- */
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /* --------------------------- ADD / EDIT MODAL ------------------------- */
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleOpenAddModal = () => {
    setEditingClass(null);
    setIsAddMode(true);
  };

  const handleSaveClass = (cls: Class) => {
    setData((prev) => {
      const exists = prev.find((c) => c.id === cls.id);
      if (exists) {
        return prev.map((c) => (c.id === cls.id ? cls : c));
      }
      return [...prev, cls];
    });
    setEditingClass(null);
    setIsAddMode(false);
  };

  /* ------------------------------- PAGINATION --------------------------- */
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "all" ? "all" : Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className=" bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-6 lg:p-8 text-black">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* HEADER WITH ADD BUTTON */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-[#0E4BA9] tracking-tight">
            Class Management
          </div>

          {/* Add Class Button */}
          <Button
            variant="gradient"
            leftIcon={<CirclePlus />}
            onClick={handleOpenAddModal}
          >
            Add Class
          </Button>
        </div>

        {/* SEARCH BAR */}
        <SearchInput value={search} onChange={setSearch} />

        {/* TABLE CONTAINER */}
        <div>
          <ClassTable
            data={displayedClasses}
            expanded={expanded}
            studentPagination={studentPagination}
            openMenu={openMenu}
            onExpand={toggleExpand}
            onMenuToggle={setOpenMenu}
            updateStudentPagination={updateStudentPagination}
            onView={(cls) => router.push(Routes.MANAGE_CLASS_DETAIL(cls.id))}
            onEdit={(cls) => {
              setEditingClass(cls);
              setIsAddMode(false);
            }}
            onCancel={(cls) => console.log("Cancel:", cls)}
          />
        </div>

        {/* PAGINATION */}
        <div>
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

        {/* ADD / EDIT MODAL */}
        {isAddMode || editingClass ? (
          <EditClassForm
            cls={editingClass}
            isAddMode={isAddMode}
            onSave={handleSaveClass}
            onCancel={() => {
              setEditingClass(null);
              setIsAddMode(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
