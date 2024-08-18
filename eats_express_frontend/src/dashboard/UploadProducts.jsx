import React from "react";
import axios from "axios";

const UploadProducts = () => {
  //handle book submission
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productName.value;
    const vendorName = form.vendorName.value;
    const adminId = form.adminId.value;
    const categoryId = form.categoryId.value;
    const imgUrl = form.imgUrl.value;
    const price = form.price.value;
    const description = form.description.value;
    const quantity = form.quantity.value;

    const productObj = {
      productName: productName,
      vendorName: vendorName,
      adminId: adminId,
      categoryId,
      imgUrl,
      price,
      description,
      quantity,
    };
    
    console.log(productObj);

    try {
      const response = await axios.post("http://localhost:8080/products/add", productObj);
      console.log(response.data)
      // form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-4 my-2 ml-52 mt-16">
      <h2 className="mb-8 text-3xl font-bold">Upload Product</h2>
      <div className="mx-auto flex justify-center border p-6 rounded-lg">
        <form onSubmit={handleProductSubmit} className="w-[500px] flex flex-col gap-4">
          {/* product title */}
          <div className="w-full">
            <div className="mb-2">
              Product Name
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="productName"
              name="productName"
              type="text"
              placeholder="Enter Product Name"
              required
            />
          </div>

          {/* vendor name */}
          <div className="w-full">
            <div className="mb-2">
            Vendor Name
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="vendorName"
              name="vendorName"
              type="text"
              placeholder="Enter Vendor Name"
              required
            />
          </div>

          {/* seller id and category id */}
          <div className="w-full">
            <div className="mb-2">
            Admin Id
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="adminId"
              name="adminId"
              type="number"
              placeholder="Enter Admin Id"
              required
            />
          </div>

          {/* Category Id*/}
          <div className="w-full">
            <div className="mb-2">
            Category Id
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="categoryId"
              name="categoryId"
              type="number"
              placeholder="Enter Book categoryId"
              required
            />
          </div>

          {/* image url and category*/}
          <div className="w-full">
            <div className="mb-2">
            Image URL
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="imgUrl"
              name="imgUrl"
              type="text"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* product price  and quantity*/}
          <div className="w-full">
            <div className="mb-2">
            Product Price
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="price"
              name="price"
              type="number"
              placeholder="Enter Product Price"
              required
            />
          </div>

          {/* Quantity */}
          <div className="w-full">
            <div className="mb-2">
            Quantity
            </div>
            <input
              className="w-full border-2 border-black-500 rounded-md p-1"
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter Product Quantity"
              required
            />
          </div>

          {/*Product Description and submit button*/}
          <div className="w-full">
            <div className="mb-1">
            Product Description
            </div>
            <textarea
              name="description"
              id="description"
              placeholder="Write Product description..."
              required
              className="w-full p-2 rounded-md border"
              rows={5}
            />
          </div>
          {/* Submit Button */}
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;
