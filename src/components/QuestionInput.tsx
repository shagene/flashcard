// File: src/components/QuestionInput.tsx
interface QuestionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string; // Add this line
}

const QuestionInput = ({ label, value, onChange, className }: QuestionInputProps) => (
  <div className={className}> {/* Apply the className here */}
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

export default QuestionInput;
