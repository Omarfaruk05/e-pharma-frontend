import React, { Suspense } from "react";
import Products from "@/components/ui/Products";
import ProcessingBtn from "@/components/loading/ProcessingBtn";

const ProductPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="w-fit">
              <ProcessingBtn />
            </div>
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductPage;
