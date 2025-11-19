import { useId } from "react";

/**
 * A reusable Select component.
 *
 * @param {object} props - The component's props.
 * @param {Array<{value: string | number, label: string}>} props.options - An array of option objects, each with a 'value' and 'label'.
 * @param {string | number} props.value - The currently selected value.
 * @param {function(Event): void} props.onChange - The change event handler.
 * @param {string} [props.label] - An optional label to display above the select input.
 * @param {string} [props.placeholder] - Optional placeholder text (shown when no value is selected).
 * @param {string} [props.className] - Optional additional CSS classes for the select element.
 */
export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
}) {
  const selectId = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
