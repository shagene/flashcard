// File: src/components/QuestionInput.tsx
interface QuestionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <td>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
      required
    />
  </td>
);

export default QuestionInput;
