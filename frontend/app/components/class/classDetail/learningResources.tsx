import { BookOpen, ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: string;
  link: string;
  description?: string;
}

interface LearningResourcesProps {
  resources?: Resource[];
}

export default function LearningResources({ resources = [] }: LearningResourcesProps) {
  if (!resources.length) return null;

  return (
    <section className="mt-8 sm:mt-10 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-2 font-bold text-gray-800">
          <BookOpen className="w-5 h-5 text-[#0E4BA9]" />
          Learning Resources
        </h2>
        <span className="badge-primary">{resources.length} Resources</span>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(r => (
          <a
            key={r.id}
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <div className="flex justify-between mb-2">
              <span className="resource-tag">{r.type}</span>
              <ExternalLink size={14} />
            </div>

            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {r.title}
            </h3>

            {r.description && (
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {r.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
