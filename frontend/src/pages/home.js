import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';
import Slider from 'rc-slider';
import Pagination from 'react-js-pagination';
import MetaData from '../components/layouts/MetaData';
import Product from '../components/product/Product';
import Loader from '../components/layouts/Loader';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState([1, 1000]);
    const [rating, setRating] = useState(0);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const keyword = match.params.keyword;

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dispatch = useDispatch();

    const { products, error, loading, itemsPerPage, count } =
        useSelector((state) => state.allProducts);

    const alert = useAlert();

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getAllProducts(currentPage, keyword, price, category, rating));
    }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Home" />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: '$1',
                                                    1000: '$1000'
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={(value) =>
                                                    `$${value}`
                                                }
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={(price) =>
                                                    setPrice(price)
                                                }
                                            />
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Category
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(
                                                        (category) => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType:
                                                                        'none'
                                                                }}
                                                                key={category}
                                                                onClick={() =>
                                                                    setCategory(
                                                                        category
                                                                    )
                                                                }>
                                                                {category}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>
                                                <ul className="pl-0">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (rating) => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType:
                                                                        'none'
                                                                }}
                                                                key={rating}
                                                                onClick={() =>
                                                                    setRating(
                                                                        rating
                                                                    )
                                                                }>
                                                                <div className="rating-outer">
                                                                    <div
                                                                        className="rating-inner"
                                                                        style={{
                                                                            width: `${rating *
                                                                                20
                                                                                }%`
                                                                        }}></div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {count ? (
                                                products &&
                                                products.map((product) => (
                                                    <Product
                                                        key={product._id}
                                                        product={product}
                                                        col={4}
                                                    />
                                                ))
                                            ) : (
                                                <h2 className="p-center">
                                                    No Product Found
                                                </h2>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                products &&
                                products.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                        col={3}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {count > itemsPerPage && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={count}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                onChange={setCurrentPageNo}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Home;
