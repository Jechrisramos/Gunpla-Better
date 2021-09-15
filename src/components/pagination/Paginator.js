import React from "react";
import { Col, Pagination } from "react-bootstrap";

export default function Paginator (props) {

    const { itemsPerPage, totalItems, currentPage, paginate } = props;
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
        pageNumbers.push(
            <Pagination.Item onClick={ ()=> paginate(i) } key={i} active={i === currentPage}>{i}</Pagination.Item>
        );
    }

    return(
        <>
        <Col xs={12} lg={12}>
            <Pagination className="paginationMenuColumn">
                { pageNumbers }
            </Pagination>
        </Col>
        </>
    );
}