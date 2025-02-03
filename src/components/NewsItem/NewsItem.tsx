import { News } from "../../types/News";
import './NewsItem.scss';

type Props = {
  newsItem: News;
};

export const NewsItem: React.FC<Props> = ({ newsItem }) => (
  <div className="news-card">
    <img
      className="news-card__image"
      src={newsItem.urlToImage}
      alt={newsItem.title}
    />
    <h2 className="news-card__title">{newsItem.title}</h2>
    <p className="news-card__author">Author:{newsItem.author}</p>
    <p className="news-card__date">
      Published: {new Date(newsItem.publishedAt).toLocaleDateString()}
    </p>
    <p className="news-card__description">{newsItem.description}</p>
    <a
      className="news-card__link"
      href={newsItem.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Read more
    </a>
  </div>
);
