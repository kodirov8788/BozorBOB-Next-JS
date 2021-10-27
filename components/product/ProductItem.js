import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn__view">View</a>
        </Link>
        <button
          className="btn__buy"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="product__card">
      {auth.user && auth.user.role === "admin" && (
        <input
          type="checkbox"
          checked={product.checked}
          className="position-absolute"
          style={{ height: "20px", width: "20px" }}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images[0].url} alt={product.images[0].url} />
      <div className="card__body">
        <h5 className="card-title text-capitalize mt-1" title={product.title}>
          {product.title}
        </h5>

        <p className="card-text mb-1" title={product.description}>
          {product.description}
        </p>
        <span className="product__sale">-20%</span>
        <div className="row justify-content-between mx-0 mb-2">
          <h6 className="text-muted" style={{ textDecoration: "line-through" }}>
            ${product.price}
          </h6>
          {product.inStock > 0 ? (
            <div className="">
              <h6 className="text-danger">In Stock: {product.price}</h6>
              <h6 className="text-danger">In Stock: {product.inStock}</h6>
            </div>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>
        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
