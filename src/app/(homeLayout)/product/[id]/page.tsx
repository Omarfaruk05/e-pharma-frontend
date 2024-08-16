import ProductDetails from "@/components/ui/ProductDetails";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductDetailsPage;
