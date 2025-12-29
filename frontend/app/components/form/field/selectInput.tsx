"use client";

interface SelectInputProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
  name,
  value,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-blue-200 rounded-lg p-2.5 bg-white
                 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
    >
      <option value="" disabled>
        Select option
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
