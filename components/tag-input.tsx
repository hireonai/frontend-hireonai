import { useState, useRef } from "react";

export function TagInput({
  value = [],
  onChange,
  disabled = false,
  placeholder = "Type then press Enter...",
  id,
  label,
}: {
  value?: string[];
  onChange?: (val: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  label?: string;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange?.([...value, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const handleRemove = (tag: string) => {
    if (disabled) return;
    onChange?.(value.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div
        className={`flex flex-wrap gap-2 px-2 py-2 border rounded transition-all duration-300 focus-within:ring-2 focus-within:ring-[#4A90A4]/20 bg-white ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-[#E3F7FB] text-[#4A90A4] rounded-full px-3 py-1 text-xs font-medium mr-1"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                className="ml-2 text-[#4A90A4] hover:text-red-400 focus:outline-none"
                onClick={() => handleRemove(tag)}
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          id={id}
          ref={inputRef}
          className={`flex-1 border-0 bg-transparent focus:ring-0 outline-none min-w-[80px] text-sm ${
            disabled ? "text-gray-400" : ""
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
