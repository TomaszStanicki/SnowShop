import React, { useState, useContext } from "react";
import "./basketTile.scss";
import { BasketProductsContext } from "../../../../components/app/App";
import Icons from "../../../../icons";
import { Link } from "react-router-dom";
import QuantityCounter from "../../../../components/quantity counter/QuantityCounter";

const BasketTile = ({ productInfo, quantityOptions, orderTile }) => {
    const basketProducts = useContext(BasketProductsContext);
    const [quantity, setQuantity] = useState(productInfo.quantity);
    const totalPrice = quantity * productInfo.price;
    return (
        <div className="basket-product">
            <Link
                to={`/${productInfo.category}/${productInfo.oldId}`}
                className="basket-product-img"
            >
                <img src={productInfo.img} alt={productInfo.category} />
            </Link>
            <div className="basket-product-info">
                <div className="basket-product-title">{productInfo.title}</div>
                {quantityOptions && (
                    <div className="basket-product-quantity">
                        Quantity:
                        <QuantityCounter
                            quantity={quantity}
                            setQuantity={setQuantity}
                            updateQuantity={true}
                            productInfo={productInfo}
                        />
                    </div>
                )}
            </div>
            <div className="basket-product-actions">
                <div className="basket-product-prices">
                    <div className="basket-product-total-price">
                        ${Math.floor(totalPrice * 100) / 100}
                    </div>
                    {productInfo.quantity > 1 && (
                        <>
                            <div className="basket-product-price">
                                per item:
                            </div>
                            <div className="basket-product-price">
                                ${productInfo.price}
                            </div>
                        </>
                    )}
                </div>
                {!orderTile && (
                    <Icons.FaTrashAlt
                        onClick={() =>
                            basketProducts.manageBasket({
                                operation: "delete",
                                productId: productInfo.id,
                                title: productInfo.title,
                            })
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default BasketTile;
