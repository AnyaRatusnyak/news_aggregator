import { useState } from 'react';
import { SourceItem } from '../SourceItem/SourceItem';
import { SourceType } from './../../types/SourceType';
import './Source.scss';
import { Pagination } from '../Pagination/Pagination';

type Props = {
  sources: SourceType[];
};

export const Source: React.FC<Props> = ({ sources }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 8; 
   const totalPages = Math.ceil(sources.length / itemsPerPage);

   const displayedSources = sources.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

   const handlePageChange = (page: number) => {
     setCurrentPage(page);
   };
  return (
    <>
      <div className="container">
        {displayedSources.map((sourceItem) => (
          <SourceItem sourceItem={sourceItem} key={sourceItem.id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
