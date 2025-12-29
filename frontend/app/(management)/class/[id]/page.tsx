"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, GraduationCap, UserCheck } from "lucide-react";

import { initialData } from "@/lib/constants/class";
import { Routes } from "@/lib/constants/routes";
import { Pagination } from "@/app/components/pagination";
import { calculateAge } from "@/app/utils/date";
import { ClassUI } from "@/app/components/class/classDetail";

export default function ClassDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const classData = initialData.find((c) => c.id === id);

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<"all" | number>(5);

  /* ================= EMPTY STATE ================= */
  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 p-8 font-[Lexend]">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Class Not Found</h2>
          <button
            onClick={() => router.push(Routes.MANAGE_CLASS)}
            className="px-6 py-2 bg-[#0E4BA9] text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  /* ================= STATS ================= */
  const totalStudents = classData.students.length;
  const activeStudents = classData.students.filter(
    (s) => s.status === "Active"
  ).length;
  const inactiveStudents = totalStudents - activeStudents;

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = classData.students.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value === "all" ? "all" : Number(e.target.value);

    setSelectedRows(val);
    setStudentsPerPage(val === "all" ? totalStudents : Number(val));
    setCurrentPage(1);
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6 font-[Lexend]">
      <div className="max-w-8xl mx-auto">
        {/* 🔹 Back */}
        <ClassUI.BackButton onClick={() => router.push(Routes.MANAGE_CLASS)} />

        {/* 🔹 Header + Stats */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <ClassUI.ClassHeader
            name={classData.name}
            category={classData.category}
            id={classData.id}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <ClassUI.StatCard
              icon={Users}
              title="Total Students"
              value={totalStudents}
              subtitle={
                <>
                  <span className="text-green-600 font-semibold">
                    {activeStudents} Active
                  </span>{" "}
                  ·{" "}
                  <span className="text-gray-500">
                    {inactiveStudents} Inactive
                  </span>
                </>
              }
              gradient="bg-gradient-to-br from-emerald-50 to-teal-50"
              iconBg="bg-emerald-500"
              border="border-emerald-200"
            />

            <ClassUI.StatCard
              icon={GraduationCap}
              title="Teachers"
              value={
                <>
                  {classData.teacher1}
                  <p className="mt-5">{classData.teacher2}</p>
                </>
              }
              subtitle={null}
              gradient="bg-linear-to-br from-purple-50 to-pink-50"
              iconBg="bg-purple-500"
              border="border-purple-200"
            />

            <ClassUI.StatCard
              icon={UserCheck}
              title="Teaching Assistants"
              value={
                <div className="space-y-1">
                  {classData.ta1}
                  <p className="mt-5">{classData.ta2}</p>
                </div>
              }
              subtitle={null}
              gradient="bg-linear-to-br from-amber-50 to-orange-50"
              iconBg="bg-amber-500"
              border="border-amber-200"
            />

            <ClassUI.ScheduleCard schedule={classData.schedule} />
          </div>
        </div>

        {/* 🔹 Student List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-black">
          <h2 className="text-xl font-bold mb-4">Student List</h2>

          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["ID", "Name", "Age", "Gender", "Status", "Actions"].map(
                    (h) => (
                      <th key={h} className="py-3 px-4 text-left font-bold">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <ClassUI.StudentRow
                    key={student.id}
                    student={student}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="block sm:hidden space-y-3">
            {currentStudents.map((stu, i) => (
              <div
                key={stu.id}
                className="border border-blue-100 rounded-xl p-4 bg-linear-to-br from-white to-blue-50"
              >
                <h3 className="font-semibold text-[#0E4BA9]">
                  {i + 1}. {stu.name}
                </h3>
                <p>Age: {calculateAge(new Date(stu.dob))}</p>
                <p>Status: {stu.status}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            text="Students"
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            total={totalStudents}
            selectedRows={selectedRows}
            onPrev={handlePrev}
            onNext={handleNext}
            onRowsChange={handleRowsChange}
          />

          {/* Resources */}
          {classData.resources?.length! > 0 && (
            <ClassUI.LearningResources resources={classData.resources} />
          )}
        </div>
      </div>
    </div>
  );
}
