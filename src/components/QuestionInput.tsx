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
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
      required
      rows={2} // Adjust the number of rows as needed
      style={{ resize: "none" }} // Prevents resizing
    />
  </td>
);

export default QuestionInput;
