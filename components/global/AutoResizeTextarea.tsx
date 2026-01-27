import { useEffect, useRef } from "react";

interface AutoResizeTextareaProps {
  description: string;
}

const AutoResizeTextarea = ({ description }: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [description]); // Run effect when description changes

  return (
    <textarea
      ref={textareaRef}
      className="resize-none bg-transparent outline-none h-auto"
      readOnly
      rows={1} // Start with a small height
      style={{ overflow: "hidden" }} // Hide scrollbar
      defaultValue={description}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto"; // Reset height
        target.style.height = target.scrollHeight + "px"; // Adjust height
      }}
    />
  );
};

export default AutoResizeTextarea;
