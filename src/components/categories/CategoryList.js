import React, { useState, useEffect } from "react";
import {Row, Col, Table, Image, Form, Modal, Button} from "react-bootstrap";
import Swal from "sweetalert2";

export default function CategoryList(props) {

    // variables
    const { allCategories, fetchData } = props;
    // useStates
    const [ categories, setCategories ] = useState([]);

    // states for add new category fields
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ featuredImg, setFeaturedImg ] = useState("");
    
    const [categoryId, setCategoryId] = useState("");

    //state for add new category modal
    const [ showAdd, setShowAdd ] = useState(false);

    // useEffects
    useEffect(()=> {
        const categoryArray = allCategories.map( category => {
            return(
                <tr key={ category._id } id={ category._id }>
                    {/* <td>{ category._id }</td> */}
                    <td> 
                        
                        {
                            (category.featuredImage !== "") ?
                            (<Image className="categoryImgThumbnail mr-2" src={ category.featuredImage }/>)
                            :
                            (<Image className="categoryImgThumbnail mr-2" src="https://image.flaticon.com/icons/png/512/44/44289.png"/>)
                        }

                        <strong>{ category.category }</strong>

                    </td>
                    <td className={ (category.isActive === true) ? "text-success" : "text-secondary" }>
                        { 
                            (category.isActive === true) ? "Active" : "Inactive" 
                        }
                    </td>
                    <td>{ category.categoryDescription }</td>
                    <td>{ `(${category.products.length}) Products` }</td>
                    <td align="center">
                        { 
                            <>
                                <Button 
                                    variant="warning"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => openEdit(category)}
                                >
                                    UPDATE
                                </Button>
                                {
                                    (category.isActive === true) ? 
                                    (
                                        <Button 
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => { deactivateCategory(category._id, category.category) }}
                                        >
                                            DISABLE
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button 
                                            variant="success"
                                            size="sm"
                                            onClick={() => { activateCategory(category._id, category.category) }}
                                        >
                                            ENABLE
                                        </Button>
                                    )
                                }
                            </>
                        }
                    </td>
                </tr>
            );
        });

        setCategories(categoryArray);
    }, [allCategories]);

    // functions
    //Create new category
    const openAdd = () => setShowAdd(true);
    const closeAdd = () => setShowAdd(false);

    const addCategory = async (e) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/categories/create`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            },
            body : JSON.stringify({
                category : title,
                categoryDescription : description,
                featuredImage : featuredImg
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data) {
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : "New Product Category is successfully added."
                });
                setTitle("");
                setDescription("");
                setFeaturedImg("");
                closeAdd();
            }else{
                fetchData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    } //end of addCategory()

    //Edit Category
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (category) => {
        setCategoryId(category._id);
        setTitle(category.category);
        setDescription(category.categoryDescription);
        setFeaturedImg(category.featuredImage);
        setShowEdit(true);
    } //end of openEdit()

    const closeEdit = () => {
        setTitle("");
        setDescription("");
        setFeaturedImg("");
        setShowEdit(false);
    } //end of closeEdit()

    const editCategory = async (e, categoryId) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/categories/${categoryId}/update`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            },
            body : JSON.stringify({
                category : title,
                categoryDescription : description,
                featuredImage : featuredImg
            })
        })
        .then(response => response.json())
        .then(updated => {
            if(updated){
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : "Product Category was updated successfully."
                });
                closeEdit();
            }else{
                fetchData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Failed to Update Product Category. Please try again." 
                });
            }
        })
        .catch( error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Failed to Update Product Category. Please try again." 
            });
        });
    }//end of editCategory()

    //delete a category
    const deactivateCategory = async (categoryId, categoryTitle) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/categories/deactivate/${categoryId}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${categoryTitle} is now inactive.`
                });
            }else{
                fetchData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    }//end of deactivateCategory()

    //restore deleted category
    const activateCategory = async (categoryId, categoryTitle) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/categories/restore/${categoryId}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem(`accessToken`) }`
            }
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${categoryTitle} is now active.`
                });
            }else{
                fetchData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch( error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    } //end of activateCategory()

    return(
        <>
            <Col>
                <Button className="customButton mb-3" onClick={ openAdd }>Add New Category</Button>
                <Table striped bordered hover responsive>
                    <thead className="bg-dark text-white">
                        <tr align="center">
                            {/* <th>ID</th> */}
                            <th>Category ({ allCategories.length })</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Products</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { categories }
                    </tbody>
                </Table>
            </Col>

        {/* Add New Product Category Modal */}
        <Modal show={ showAdd } onHide={ closeAdd }>
            <Form onSubmit={ e => addCategory(e) }>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={title}
                                    onChange={ e => setTitle(e.target.value) }
                                    placeholder="Category Title"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={description}
                                    onChange={ e => setDescription(e.target.value) }
                                    placeholder="Category Description"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Featured Image</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={featuredImg}
                                    onChange={ e => setFeaturedImg(e.target.value) }
                                    placeholder="Featured Image URL"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ closeAdd }>Close</Button>
                    <Button variant="success" type="submit">Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>

        {/* Edit Product Category */}
        <Modal show={ showEdit } onHide={ closeEdit }>
            <Form onSubmit={ e => editCategory(e, categoryId) }>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={title}
                                    onChange={ e => setTitle(e.target.value) }
                                    placeholder="Category Title"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={description}
                                    onChange={ e => setDescription(e.target.value) }
                                    placeholder="Category Description"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Featured Image</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={featuredImg}
                                    onChange={ e => setFeaturedImg(e.target.value) }
                                    placeholder="Featured Image URL"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ closeEdit }>Close</Button>
                    <Button variant="warning" type="submit">Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
} //end of CategoryList()