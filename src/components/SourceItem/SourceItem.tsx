
import { SourceType } from './../../types/SourceType';
import './SourceItem.scss';

type Props = {
  sourceItem: SourceType;
};

export const SourceItem: React.FC<Props> = ({ sourceItem }) => (
  <div className="source-card">
    <h2 className="source-card__title">{sourceItem.name}</h2>
    <p className="source-card__description">{sourceItem.description}</p>
    <a
      className="source-card__link"
      href={sourceItem.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit site
    </a>
    <p className="source-card__category">category:{sourceItem.category}</p>
    <p className="source-card__language">language: {sourceItem.language}</p>
    <p className="source-card__country">country: {sourceItem.country}</p>
  </div>
);
