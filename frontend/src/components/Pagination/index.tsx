
import ReactPaginate from 'react-paginate';

import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

type Props = {
    forcePage?: number;
    pageCount: number;
    range: number;
    onChange?: (pageNumber: number) => void;
}

const Pagination = ( {forcePage, pageCount, range, onChange} : Props ) => {
    return (
        <>
            <ReactPaginate 
                forcePage={forcePage}
                pageCount={pageCount}
                pageRangeDisplayed={range}
                marginPagesDisplayed={1}
                containerClassName="pagination-container"
                pageLinkClassName="pagination-item"
                breakClassName="pagination-item"
                previousLabel={ <div className="pagination-arrow-container"><ArrowIcon /></div> }
                nextLabel={ <div className="pagination-arrow-container"><ArrowIcon /></div> }
                previousClassName="arrow-previous"
                nextClassName="arrow-next"
                activeLinkClassName="pagination-link-active"
                disabledClassName="arrow-inactive"
                onPageChange={(items) => (onChange) ? onChange(items.selected) : {}}
            />
        </>
    );
}

export default Pagination;