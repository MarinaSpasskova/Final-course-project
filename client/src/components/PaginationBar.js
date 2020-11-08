import React from "react";
import {Link} from 'react-router-dom'


export const PaginationBar = ({page, total_pages, link_to}) => {
    console.log("PaginationBar")
    console.log("PaginationBar page: ", page, " total_pages: ", total_pages)
    if (!page) {
        return (null)
    }
    const page_int = parseInt(page)
    const total_pages_int = parseInt(total_pages)
    if (total_pages === 1) {
        return (null)
    }
    let page_number_array;
    if (9 < total_pages_int) {
        page_number_array = Array.from(Array(9).keys());
    } else {
        page_number_array = Array.from(Array(total_pages_int+1).keys());
    }
    page_number_array.splice(0, 1);
    console.log("PaginationBar before retrun")
    return (
        <ul className="pagination">
            {page_number_array.map((page_number) => {
                return <li className={page_int === page_number ? "active deep-purple accent-2" : "waves-effect"}
                           key={page_number}>
                    <Link to={`${link_to}/${page_number}`}>{page_number}</Link>
                </li>
            })}
        </ul>)
}


