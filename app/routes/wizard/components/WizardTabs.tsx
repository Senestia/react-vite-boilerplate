import type { WizardTab } from "../types"

interface WizardTabsProps {
  activeTab: WizardTab
  onTabChange: (tab: WizardTab) => void
}

export function WizardTabs({ activeTab, onTabChange }: WizardTabsProps) {
  const tabs: { id: WizardTab; label: string }[] = [
    { id: "spells", label: "Spells" },
    { id: "elixirs", label: "Elixirs" },
  ]

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`border-b-2 px-1 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
