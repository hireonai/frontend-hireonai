import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ActiveFilters({
  submittedKeyword,
  onRemoveKeyword,
  salaryRange,
  onRemoveSalary,
  selectedExperience,
  onRemoveExperience,
  jobMinExperiences,
  selectedIndustry,
  onRemoveIndustry,
  companyIndustries,
  selectedCategories,
  onRemoveCategory,
  jobCategories,
  onResetAll,
}: {
  submittedKeyword: string;
  onRemoveKeyword: () => void;
  salaryRange: number[];
  onRemoveSalary: () => void;
  selectedExperience?: string;
  onRemoveExperience: () => void;
  jobMinExperiences?: any[] | null;
  selectedIndustry?: string;
  onRemoveIndustry: () => void;
  companyIndustries?: any[] | null;
  selectedCategories: string[];
  onRemoveCategory: (id: string) => void;
  jobCategories?: any[] | null;
  onResetAll: () => void;
}) {
  const activeCount =
    (submittedKeyword ? 1 : 0) +
    (salaryRange[0] > 0 || salaryRange[1] > 0 ? 1 : 0) +
    (selectedExperience ? 1 : 0) +
    (selectedIndustry ? 1 : 0) +
    selectedCategories.length;

  if (!activeCount) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {submittedKeyword && (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-blue-100 text-blue-700 border-blue-300"
        >
          <span>{submittedKeyword}</span>
          <X className="w-3 h-3 cursor-pointer" onClick={onRemoveKeyword} />
        </Badge>
      )}
      {(salaryRange[0] > 0 || salaryRange[1] > 0) && (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-green-100 text-green-700 border-green-300"
        >
          <span>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(salaryRange[0])}
            {salaryRange[1] > 0 &&
              ` - ${Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(salaryRange[1])}`}
          </span>
          <X className="w-3 h-3 cursor-pointer" onClick={onRemoveSalary} />
        </Badge>
      )}
      {selectedExperience && (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-purple-100 text-purple-700 border-purple-300"
        >
          <span>
            {jobMinExperiences?.find((e) => e._id === selectedExperience)
              ?.name || selectedExperience}
          </span>
          <X className="w-3 h-3 cursor-pointer" onClick={onRemoveExperience} />
        </Badge>
      )}
      {selectedIndustry && (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-orange-100 text-orange-700 border-orange-300"
        >
          <span>
            {companyIndustries?.find((i) => i._id === selectedIndustry)?.name ||
              selectedIndustry}
          </span>
          <X className="w-3 h-3 cursor-pointer" onClick={onRemoveIndustry} />
        </Badge>
      )}
      {selectedCategories.map((cat) => (
        <Badge
          key={cat}
          variant="outline"
          className="flex items-center gap-1 bg-gray-100 text-gray-700 border-gray-300"
        >
          <span>{jobCategories?.find((c) => c._id === cat)?.name || cat}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => onRemoveCategory(cat)}
          />
        </Badge>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="ml-2 px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200"
        onClick={onResetAll}
        type="button"
      >
        Reset All
      </Button>
    </div>
  );
}
