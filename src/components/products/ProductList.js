import React, { useState, useEffect } from "react";
import {Row, Col, Table, Image, Form, Modal, Button} from "react-bootstrap";
import Swal from "sweetalert2";

export default function ProductList(props) {

    //variables
    const { allProducts, allCategory, fetchProductData } = props;
    
    //useStates
    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    // states for add new product fields
    const [ name, setName ] = useState("");
    const [ SKU, setSKU ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ category, setCategory ] = useState("");
    const [ gallery, setGallery ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ shortDescription, setShortDescription ] = useState("");

    const [fetchCategory, setFetchCategory] = useState("");
    const [productId, setProductId] = useState();
    
    //state for add new product modal
    const [ showAdd, setShowAdd ] = useState(false);

    //useEffects
    useEffect(() => {
        const productArray = allProducts.map( product => {
            
            let categoryName = "";
            allCategory.map( category => {
                if(category._id === product.category){
                    categoryName = category.category;
                }
            });

            return(
                <tr key={ product._id } id={ product._id }>
                    {/* <td>{ product._id }</td> */}
                    <td className="customCol">
                        {
                            (product.gallery !== "") ?
                            (<Image className="categoryImgThumbnail mr-2" src={ product.gallery }/>)
                            :
                            (<Image className="categoryImgThumbnail mr-2" src="https://image.flaticon.com/icons/png/512/44/44289.png"/>)
                        }
                        <strong>{ product.productName }</strong>
                    </td>
                    <td className={ (product.isAvailable === true) ? "text-success" : "text-danger" } align="center">
                        { 
                            (product.isAvailable === true) ? 
                            "Available" 
                            :
                            "Unavailable"
                        }
                    </td>
                    <td align="center">{ product.sku }</td>
                    <td className="customCol">{ product.description }</td>
                    <td className="customPriceCol"> PHP { product.price }.00</td>
                    <td align="center">{ categoryName }</td>
                    <td align="center">
                        { 
                            <>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => openEdit(product)}
                                >
                                    UPDATE
                                </Button>
                                {
                                    (product.isAvailable === true) ?
                                    (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="mr-2"
                                            onClick={ () => { deactivateProduct(product._id, product.productName) } }
                                        >
                                            DISABLE
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button
                                            variant="success"
                                            size="sm"
                                            className="mr-2"
                                            onClick={ () => { activateProduct(product._id, product.productName) } }
                                        >
                                            ENABLE
                                        </Button>
                                    )
                                }
                            </>
                        }
                    </td>
                </tr>
            );//end of return
        });//end of productArray

        //dropdown field options
        const categoryArray = allCategory.map( category => {
            return(
                <>
                    {
                        ( category.isActive === true ) ?
                            (
                                <option key={ category._id } value={ category._id }>{ category.category }</option>
                            )
                        : 
                            (
                                ""
                            )
                    }
                </>
                
            );
        });//end of avatarArray

        setProducts(productArray);
        setCategories(categoryArray);

    }, [allProducts, allCategory]);

    //functions
    //Create new product
    const openAdd = () => setShowAdd(true);
    const closeAdd = () => setShowAdd(false);

    const addProduct = async (e) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/products/create`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            },
            body : JSON.stringify({
                productName : name,
                sku : SKU,
                description : description,
                price : price,
                gallery : gallery,
                shortDescription : shortDescription,
                category : category
            })
        })
        .then(response => response.json())
        .then(saved => {
            if(saved){
                fetchProductData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : "New Product is successfully created."
                });
                setName("");
                setSKU("");
                setPrice("");
                setCategory("");
                setGallery("");
                setDescription("");
                setShortDescription("");
                closeAdd();
            }else{
                fetchProductData();
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
    } // end of addProduct()

    //Update product
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (product) => {
        setProductId(product._id);
        setName(product.productName);
        setSKU(product.sku);
        setPrice(product.price);
        setCategory(product.category);
        setGallery(product.gallery);
        setDescription(product.description);
        setShortDescription(product.shortDescription);
        setShowEdit(true);
    } //end of openEdit()

    const closeEdit = () => {
        setName("");
        setSKU("");
        setPrice("");
        setCategory("");
        setGallery("");
        setDescription("");
        setShortDescription("");
        setShowEdit(false);
    } //end of closeEdit()

    const editProduct = async (e, productId) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/update`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            },
            body : JSON.stringify({
                productName : name,
                sku : SKU,
                description : description,
                price : price,
                gallery : gallery,
                shortDescription : shortDescription,
                category : category
            })
        })
        .then(response => response.json())
        .then(updatedProduct =>{
            if(updatedProduct){
                fetchProductData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : "Product was updated successfully."
                });
                closeEdit();
            }else{
                fetchProductData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Failed to Update Product. Please try again." 
                });
            }
        })
        .catch( error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Failed to Update Product. Please try again." 
            });
        });
    } //end of editProduct()

    //delete a product
    const deactivateProduct = async (prodId, productName) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/archive/${prodId}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                fetchProductData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${productName} is now inactive.`
                });
            }else{
                fetchProductData();
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
    } //end of deactivateProduct()

    //restore deleted product
    const activateProduct = async (prodId, productName) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/restore/${prodId}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem(`accessToken`) }`
            }
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                fetchProductData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${productName} is now active.`
                });
            }else{
                fetchProductData();
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
    } //end of activateProduct()

    return(
        <>
            <Col>
                <Button className="customButton mb-3" onClick={ openAdd }>Add New Product</Button>
                <Table striped bordered hover responsive>
                    <thead className="bg-dark text-white">
                        <tr align="center">
                            {/* <td>ID</td> */}
                            <td className="customCol">PRODUCTS ({ allProducts.length })</td>
                            <td>STATUS</td>
                            <td>SKU</td>
                            <td className="customCol">DESCRIPTION</td>
                            <td className="customPriceCol">PRICE</td>
                            <td>CATEGORY</td>
                            <td>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        { products }
                    </tbody>
                </Table>
            </Col>

            {/* Add New Product Modal */}
            <Modal show={ showAdd } onHide={ closeAdd }>
                <Form onSubmit={ e => addProduct(e) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ name }
                                        onChange={ e => setName(e.target.value) }
                                        placeholder="Product Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>SKU</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ SKU }
                                        onChange={ e => setSKU(e.target.value) }
                                        placeholder="SKU"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={ price }
                                        onChange={ e => setPrice(e.target.value) }
                                        placeholder="Price"
                                        min="50"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <select className="custom-select" value={category} onChange={ e => setCategory(e.target.value) }>
                                        { categories }
                                    </select>
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Featured Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ gallery }
                                        onChange={ e => setGallery(e.target.value) }
                                        placeholder="Featured Image"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ description }
                                        onChange={ e => setDescription(e.target.value) }
                                        placeholder="Description"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ shortDescription }
                                        onChange={ e => setShortDescription(e.target.value) }
                                        placeholder="Short Description"
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

            {/* Edit New Product Modal */}
            <Modal show={ showEdit } onHide={ closeEdit }>
                <Form onSubmit={ e => editProduct(e, productId) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ name }
                                        onChange={ e => setName(e.target.value) }
                                        placeholder="Product Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>SKU</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ SKU }
                                        onChange={ e => setSKU(e.target.value) }
                                        placeholder="SKU"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={ price }
                                        onChange={ e => setPrice(e.target.value) }
                                        placeholder="Price"
                                        min="50"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <select className="custom-select" value={category} onChange={ e => setCategory(e.target.value) }>
                                        { categories }
                                    </select>
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Featured Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ gallery }
                                        onChange={ e => setGallery(e.target.value) }
                                        placeholder="Featured Image"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ description }
                                        onChange={ e => setDescription(e.target.value) }
                                        placeholder="Description"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ shortDescription }
                                        onChange={ e => setShortDescription(e.target.value) }
                                        placeholder="Short Description"
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

} //end of ProductList()