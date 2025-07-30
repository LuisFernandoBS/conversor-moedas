import { SelectMoeda } from "./SelectMoeda";

export function CampoConversao() {
  return (
    <div className="relative">
      <span
        className="absolute inset-y-0 left-0 grid w-fit place-content-center text-gray-700 dark:text-gray-200"
      >
        <SelectMoeda />
      </span>

      <input
        type="text"
        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />
    </div>
  )
}