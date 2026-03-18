export default function Loader({ size = 40 }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.25"
          className="text-primary"
        />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill="currentColor"
          fillOpacity="0.75"
          className="text-primary"
          style={{
            clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)",
          }}
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="1"
          strokeDasharray="10 56.5"
          className="text-primary"
        />
      </svg>
    </div>
  );
}
