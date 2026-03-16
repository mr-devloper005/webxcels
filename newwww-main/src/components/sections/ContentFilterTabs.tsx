import { motion } from 'framer-motion';
import type { ContentType } from '@/lib/data';

type FilterValue = ContentType | 'all';

interface ContentFilterTabsProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts?: Record<FilterValue, number>;
}

const tabs: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
];

const ContentFilterTabs = ({ active, onChange, counts }: ContentFilterTabsProps) => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50 w-fit" role="tablist">
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          role="tab"
          aria-selected={active === value}
          onClick={() => onChange(value)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            active === value ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {active === value && (
            <motion.div
              layoutId="activeFilterTab"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">
            {label}
            {counts && counts[value] !== undefined && (
              <span className="ml-1.5 text-[10px] opacity-70">({counts[value]})</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ContentFilterTabs;
