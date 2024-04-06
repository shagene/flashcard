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
      minLength={1}
      maxLength={500}
      rows={2}
      style={{ resize: "none" }}
      onInvalid={(e) => {
        const target = e.target as HTMLTextAreaElement;
        const nonSpaceCount = value.trim().length;
        if (nonSpaceCount < 1) {
          target.setCustomValidity("Question must have at least 1 character");
        } else if (nonSpaceCount > 500) {
          target.setCustomValidity("Question cannot exceed 500 characters");
        } else {
          target.setCustomValidity("");
        }
      }}
    />
  </td>
);

export default QuestionInput;
