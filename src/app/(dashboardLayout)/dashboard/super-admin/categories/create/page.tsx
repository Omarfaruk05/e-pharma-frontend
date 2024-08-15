import CreateCategoryForm from "@/components/form/CreateCategoryForm";

import React from "react";

const CreateCategoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create New Category
      </h1>
      <CreateCategoryForm />
    </div>
  );
};

export default CreateCategoryPage;
