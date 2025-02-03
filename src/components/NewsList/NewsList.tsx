import { News } from "../../types/News";
import "./NewsList.scss";
import { NewsItem } from "../NewsItem/NewsItem";
import { Pagination } from "../Pagination/Pagination";

type Props = {
  news: News[];
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
};

export const NewsList: React.FC<Props> = ({
  news,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange = () => {},
}) => {
  return (
    <>
      <div className="container">
        {news.map((newsItem) => (
          <NewsItem newsItem={newsItem} key={newsItem.id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(100 / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </>
  );
};
