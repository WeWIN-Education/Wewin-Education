"use client";

import React from "react";
import { Class, CLASS_HEADERS, STUDENT_HEADERS } from "@/lib/constants/class";
import {
  Users,
  Edit,
  Eye,
  Ban,
  Clock,
  School,
  UserRound,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination, RowsPerPage } from "@/app/components/pagination";
import { StatusBadge } from "@/app/components/status";
import { calculateAge } from "@/app/utils/date";
import MobileMenu from "../mobileClassMenu";

interface Props {
  data: Class[];
  expanded: Set<string>;

  studentPagination: {
    [classId: string]: { page: number; rows: RowsPerPage };
  };

  openMenu: string | null;

  onExpand: (id: string) => void;
  onMenuToggle: (id: string | null) => void;

  updateStudentPagination: (
    classId: string,
    data: { page?: number; rows?: RowsPerPage }
  ) => void;

  onView: (c: Class) => void;
  onEdit: (c: Class) => void;
  onCancel: (c: Class) => void;
}

export default function ClassTable({
  data,
  expanded,
  studentPagination,
  openMenu,
  onExpand,
  onMenuToggle,
  updateStudentPagination,
  onView,
  onEdit,
  onCancel,
}: Props) {
  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP TABLE */}
      {/* ========================================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-blue-100 overflow-x-auto">
        <table className="w-full border-collapse text-gray-800">
          <thead className="bg-linear-to-r from-[#0E4BA9] to-[#007BCE] text-white text-sm uppercase">
            <tr>
              {CLASS_HEADERS.map((header) => (
                <th key={header} className="px-6 py-3 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {data.map((cls) => {
              /* ================= STUDENT PAGINATION ================= */
              const pag = studentPagination[cls.id] || { page: 1, rows: 5 };
              const page = pag.page;
              const rows = pag.rows;

              const totalPages =
                rows === "all"
                  ? 1
                  : Math.ceil(cls.students.length / Number(rows));

              const start = rows === "all" ? 0 : (page - 1) * Number(rows);
              const end =
                rows === "all" ? cls.students.length : start + Number(rows);

              const students = cls.students.slice(start, end);

              /* ====================================================== */

              return (
                <React.Fragment key={cls.id}>
                  <tr
                    className={`cursor-pointer transition ${
                      expanded.has(cls.id) ? "bg-blue-50" : "hover:bg-blue-50"
                    }`}
                    onClick={() => onExpand(cls.id)}
                  >
                    <td className="px-6 py-5 text-center">{cls.id}</td>

                    <td className="px-6 py-5 text-center font-semibold text-[#0E4BA9]">
                      <div className="inline-flex items-center gap-2 leading-none">
                        <Users className="w-4 h-4 text-[#0E4BA9] shrink-0" />
                        <span className="align-middle">{cls.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">{cls.category}</td>

                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col">
                        <span>{cls.teacher1}</span>
                        {cls.teacher2 && <span>{cls.teacher2}</span>}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col">
                        <span>{cls.ta1}</span>
                        {cls.ta2 && <span>{cls.ta2}</span>}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col">
                        {(Array.isArray(cls.schedule)
                          ? cls.schedule
                          : cls.schedule.split(/[,;]+/)
                        ).map((s, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <Clock size={14} className="text-blue-600" />
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center font-bold text-[#0E4BA9]">
                      {cls.students.length}
                    </td>

                    <td
                      className="px-6 py-5 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-center gap-2">
                        <button
                          className="
                            p-2 rounded-lg 
                            bg-blue-500 text-white 
                            shadow-sm
                            cursor-pointer
                            transition-all duration-200
                            hover:bg-blue-600 hover:shadow-lg hover:scale-110
                            active:scale-95
                          "
                          onClick={() => onView(cls)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          className="
                            p-2 rounded-lg 
                            bg-yellow-500 text-white 
                            cursor-pointer
                            transition-all duration-200
                            hover:bg-yellow-600 hover:scale-110 hover:shadow-lg
                            active:scale-95
                          "
                          onClick={() => onEdit(cls)}
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          className="
                            p-2 rounded-lg 
                          bg-red-500 text-white 
                            cursor-pointer
                            transition-all duration-200
                           hover:bg-red-600 hover:scale-110 hover:shadow-lg
                            active:scale-95
                          "
                          onClick={() => onCancel(cls)}
                        >
                          <Ban size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ============================ EXPANDED STUDENT ROW ============================ */}
                  <AnimatePresence>
                    {expanded.has(cls.id) && (
                      <motion.tr
                        key={`${cls.id}-expand`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <td colSpan={CLASS_HEADERS.length} className="p-4">
                          <div className="bg-white rounded-xl border border-blue-100 p-4 shadow">
                            <h3 className="text-lg font-bold text-[#0E4BA9] mb-4">
                              👥 Students in {cls.name} ({cls.students.length})
                            </h3>

                            <table className="w-full text-sm">
                              <thead className="bg-linear-to-r from-[#007BCE] to-[#0E4BA9] text-white">
                                <tr>
                                  {STUDENT_HEADERS.map((h) => (
                                    <th key={h} className="px-5 py-3 text-left">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>

                              <tbody>
                                {students.map((stu) => (
                                  <tr
                                    key={stu.id}
                                    className="border-b border-blue-100 hover:bg-blue-50"
                                  >
                                    <td className="px-5 py-3 font-semibold text-[#0E4BA9]">
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

                                    <td className="px-5 py-3">
                                      <div className="flex gap-2">
                                        <button className="p-2 bg-blue-500 text-white rounded">
                                          <Eye size={16} />
                                        </button>
                                        <button className="p-2 bg-yellow-500 text-white rounded">
                                          <Edit size={16} />
                                        </button>
                                        <button className="p-2 bg-orange-500 text-white rounded">
                                          <Ban size={16} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <Pagination
                              text="Students"
                              currentPage={page}
                              totalPages={totalPages}
                              startIndex={start}
                              endIndex={end}
                              total={cls.students.length}
                              selectedRows={rows}
                              onPrev={() =>
                                updateStudentPagination(cls.id, {
                                  page: Math.max(1, page - 1),
                                })
                              }
                              onNext={() =>
                                updateStudentPagination(cls.id, {
                                  page:
                                    page < totalPages ? page + 1 : totalPages,
                                })
                              }
                              onRowsChange={(e) =>
                                updateStudentPagination(cls.id, {
                                  page: 1,
                                  rows:
                                    e.target.value === "all"
                                      ? "all"
                                      : Number(e.target.value),
                                })
                              }
                            />
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ========================================= */}
      {/* MOBILE VERSION */}
      {/* ========================================= */}
      <div className="md:hidden space-y-4 mt-6 text-black">
        {data.map((cls) => {
          const pag = studentPagination[cls.id] || { page: 1, rows: 5 };
          const page = pag.page;
          const rows = pag.rows;

          const totalPages =
            rows === "all" ? 1 : Math.ceil(cls.students.length / Number(rows));

          const start = rows === "all" ? 0 : (page - 1) * Number(rows);
          const end =
            rows === "all" ? cls.students.length : start + Number(rows);

          const students = cls.students.slice(start, end);

          return (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl shadow-md border border-blue-100 p-4 ${
                expanded.has(cls.id)
                  ? "ring-2 ring-[#0E4BA9]/40"
                  : "hover:shadow-lg"
              }`}
              onClick={() => onExpand(cls.id)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0E4BA9]">
                    {cls.name}
                  </h3>
                  <p className="text-sm text-gray-600">{cls.category}</p>
                  <p className="text-sm mt-1 flex items-center gap-1">
                    <School size={14} className="text-[#0E4BA9]" />
                    {cls.teacher1}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <UserRound size={14} className="text-[#0E4BA9]" />
                    {cls.ta1}
                  </p>
                  <p className="text-sm flex items-center gap-1 mt-1">
                    <Clock size={14} className="text-[#0E4BA9]" />
                    {Array.isArray(cls.schedule)
                      ? cls.schedule.join(", ")
                      : cls.schedule}
                  </p>
                  <p className="text-sm font-medium text-[#0E4BA9] mt-1 flex items-center gap-1">
                    <UsersRound size={16} />
                    {cls.students.length} Students
                  </p>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <MobileMenu
                    cls={cls}
                    openMenu={openMenu}
                    setOpenMenu={onMenuToggle}
                    handleViewClass={onView}
                    handleEditClass={onEdit}
                    handleCancelClass={onCancel}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expanded.has(cls.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="border-t border-blue-100 pt-3 space-y-2">
                      {students.map((stu) => (
                        <motion.div
                          key={stu.id}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-between bg-blue-50 p-2 rounded-lg text-sm"
                        >
                          <span className="font-semibold text-[#0E4BA9]">
                            {stu.name}
                          </span>
                          <StatusBadge status={stu.status} />
                        </motion.div>
                      ))}

                      <div onClick={(e) => e.stopPropagation()}>
                        <Pagination
                          text="Students"
                          currentPage={page}
                          totalPages={totalPages}
                          startIndex={start}
                          endIndex={end}
                          total={cls.students.length}
                          selectedRows={rows}
                          onPrev={() =>
                            updateStudentPagination(cls.id, {
                              page: Math.max(1, page - 1),
                            })
                          }
                          onNext={() =>
                            updateStudentPagination(cls.id, {
                              page: page < totalPages ? page + 1 : totalPages,
                            })
                          }
                          onRowsChange={(e) =>
                            updateStudentPagination(cls.id, {
                              rows:
                                e.target.value === "all"
                                  ? "all"
                                  : Number(e.target.value),
                              page: 1,
                            })
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
