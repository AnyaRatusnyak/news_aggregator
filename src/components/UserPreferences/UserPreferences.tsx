import { useState } from "react";
import "./UserPreferences.scss";
import { NewsList } from "../NewsList/NewsList";

interface UserPreferencesProps {
  preferences: string[];
  preferredNews: News[];
  onPreferenceUpdate: (preference: string) => void;
}

export const UserPreferences: React.FC<UserPreferencesProps> = ({
  preferences,
  preferredNews,
  onPreferenceUpdate,
}) => {
  const categories: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

   const startIndex = (currentPage - 1) * itemsPerPage;
   const paginatedPreferredNews = preferredNews.slice(
     startIndex,
     startIndex + itemsPerPage
   );

  const handleTogglePreference = (category: string) => {
    onPreferenceUpdate(category);
  };

  const handleMouseEnter = (category: string) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div>
      <h3>Choose categories</h3>
      <div>
        {categories.map((category, index) => {
          const isInPreferences = preferences.includes(category);
          const isHovered = hoveredCategory === category;

          const buttonText = isHovered
            ? isInPreferences
              ? "Cancel " + `${category}`
              : "Add " + `${category}`
            : category;

          const buttonClass = `button is-light is-small ${
            isInPreferences && isHovered ? "is-danger" : "is-link"
          }`;

          return (
            <button
              key={index}
              onClick={() => handleTogglePreference(category)}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
              className={buttonClass}
            >
              {buttonText}
            </button>
          );
        })}
      </div>

      <h3>Your preferences</h3>
      <div>
        {preferences == null || preferences.length === 0 ? (
          <h3>No preferences</h3>
        ) : (
          preferences.map((preference, index) => (
            <span key={index} className="button is-ghost">
              {preference}
            </span>
          ))
        )}
      </div>
      <h3>News for you</h3>
      <div>
        <NewsList
          news={paginatedPreferredNews}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};