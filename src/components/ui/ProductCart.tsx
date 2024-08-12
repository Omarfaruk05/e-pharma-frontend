import Image from "next/image";
import productImg from "../../assects/product.webp";

const ProductCart = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg space-y-3">
      <div>
        <Image
          className="w-full rounded-xl"
          src={productImg}
          width={200}
          alt="product-image"
        />
      </div>

      <h4 className="text-xl font-semibold">Sergel</h4>
      <div className="text-sm">
        <h5 className="text-lime-500">Esomeprazole Magnesium Trihydrate</h5>
        <h5>Healthcare Pharmacuticals Ltd.</h5>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">6.30</h3>
          <p>7.00</p>
        </div>
        <div>
          <button className="font-semibold rounded-sm bg-sky-500 px-2 py-1 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
