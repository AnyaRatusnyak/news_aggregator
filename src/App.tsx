import { Routes, Route } from "react-router-dom";
import { NewsList } from "./components/NewsList/NewsList";
import { News } from "./types/News";
import "./App.scss";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { UserPreferences } from "./components/UserPreferences/UserPreferences";
import { Source } from "./components/Source/Source";
import { getNews } from "./services/news";
import { getSources } from "./services/sources";
import { getPreferences } from "./services/preferences";
import { getPreferredNews } from "./services/preferredNews";
import { updateUserPreferences } from "./services/preferences";
import { SourceType } from "./types/SourceType";
import { AuthToggle } from "./components/AuthToggle/AuthToggle";

export const App: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [sources, setSources] = useState<SourceType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferredNews, setPreferredNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchNews = (
    page: number = 1,
    size: number = itemsPerPage,
    query: string = ""
  ) => {
    const url = query
      ? `/search?keywords=${encodeURIComponent(query)}&page=${
          page - 1
        }&size=${size}`
      : `/search/latest?page=${page - 1}&size=${size}`;
    getNews(url).then((newsFromServer) => {
      setNews(newsFromServer);
      setCurrentPage(page);
    });
  };

  const fetchSources = () => {
    getSources().then((sourcesFromServer) => {
      setSources(sourcesFromServer);
    });
  };

  const fetchPreferences = (userId: string) => {
    getPreferences(userId)
      .then((response) => {
        console.log("Preferences fetched:", response);
        const preferencesArray = response.preferences || [];
        setPreferences(preferencesArray);
      })
      .catch((error) => {
        console.error("Error fetching preferences:", error);
        setPreferences([]);
      });
  };

  const fetchPreferredNews = () => {
    if (preferences.length > 0) {
      const categories = preferences.join(",");

      getPreferredNews(categories)
        .then((preferredNewsFromServer) => {
          setPreferredNews(preferredNewsFromServer);
        })
        .catch((error) => {
          console.error("Error fetching preferred news:", error);
          setPreferredNews([]);
        });
    } else {
      setPreferredNews([]);
    }
  };

  const updatePreference = (preference: string) => {
    const updatedPreferences = preferences.includes(preference)
      ? preferences.filter((pref) => pref !== preference)
      : [...preferences, preference];

    const userData = { preferences: updatedPreferences };

    if (userId) {
      updateUserPreferences(userId, userData)
        .then((response) => {
          console.log("Preferences updated:", response);
          const preferencesArray = response.preferences || [];
          setPreferences(preferencesArray);
        })
        .catch((error) => {
          console.error("Error fetching preferences:", error);
          setPreferences([]);
        });
    }
  };

  const handleOnChange = (userId: string, email: string) => {
    setUserId(userId);
    setEmail(email);
  };

  useEffect(() => {
    fetchNews();
    fetchSources();
    if (userId) {
      fetchPreferences(userId);
    }
  }, [userId]);

  useEffect(() => {
    fetchPreferredNews();
  }, [preferences]);

  return (
    <>
      <div>
        <Header
          onSearch={(query) => fetchNews(1, itemsPerPage, query)}
          email={email}
        />
      </div>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <NewsList
                news={news}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => fetchNews(page, itemsPerPage)}
              />
            }
          />
          <Route
            path="/preferences"
            element={
              <UserPreferences
                preferences={preferences}
                preferredNews={preferredNews}
                onPreferenceUpdate={updatePreference}
              />
            }
          />
          <Route path="/source" element={<Source sources={sources} />} />
          <Route
            path="/sign-in"
            element={<AuthToggle onChange={handleOnChange} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;