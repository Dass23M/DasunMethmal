'use client';

/**
 * Animated mouse scroll indicator at the bottom of hero sections.
 */
interface MouseScrollProps {
  targetId: string;
}

export default function MouseScroll({ targetId }: MouseScrollProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a href={`#${targetId}`} className="mouse-wrap" onClick={handleClick} aria-label="Scroll down">
      <span className="mouse-label">Scroll</span>
      <span className="mouse">
        <span className="scroll" />
      </span>
    </a>
  );
}
