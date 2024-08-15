import React, { Suspense } from "react";
import Products from "@/components/ui/Products";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Products...</div>}>
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductPage;
