"use client";

type Props = { value: string; className?: string };

export default function CopyButton({ value, className }: Props) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(value)}
      className={className ?? "ml-2 bg-white text-black px-2 py-1 rounded hover:bg-gray-200"}
    >
      Copy
    </button>
  );
}
