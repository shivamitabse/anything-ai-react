import { useEffect, useState } from "react";
import "./AddProducts.css";

const AddProducts = () => {
  const [htmlFormData, changeFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    category: "",
  });

  const [files, changeFiles] = useState([]);
  const [objectUrls, changeObjectUrls] = useState([]);

  const onChangeFormData = (e) => {
    changeFormData({ ...htmlFormData, [e.target.name]: e.target.value });
  };

  const onUploadChange = (e) => {
    if (files.length >= 5) {
      alert("cant upload more than 5 images");
      return;
    }
    const filesArray = Array.from(e.target.files);
    changeFiles((prev) => [...prev, ...filesArray]);
  };

  const handleRemoveImage = (indexToRemove) => {
    changeFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  useEffect(() => {
    const tempUrls = files.map((file) => URL.createObjectURL(file));
    changeObjectUrls(tempUrls);

    return () => {
      tempUrls.forEach((eachUrl) => URL.revokeObjectURL(eachUrl));
    };
  }, [files]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (files.length < 5) {
      alert("5 images required");
      return;
    }
    const formData = new FormData();
    formData.append("name", htmlFormData.name);
    formData.append("shortDescription", htmlFormData.shortDescription);
    formData.append("longDescription", htmlFormData.longDescription);
    formData.append("price", htmlFormData.price);
    formData.append("category", htmlFormData.category);
    files.forEach((file) => formData.append("images", file));

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/add-product`,
      {
        method: "POST",
        credentials: "include", // ✅ add
        body: formData,
      },
    );
    const result = await res.json();
    // console.log(result);
  };

  return (
    <div className="add-products-component">
      <form className="upload-form" onSubmit={onFormSubmit}>
        <h2>Upload Product Details:</h2>
        <label htmlFor="name">Product Name: </label>
        <input
          onChange={onChangeFormData}
          className="form-el"
          type="text"
          id="name"
          name="name"
          required
        />
        <label htmlFor="shortDescription">Short Description: </label>
        <textarea
          onChange={onChangeFormData}
          className="form-el"
          rows="2"
          id="shortDescription"
          name="shortDescription"
          required
        />
        <label htmlFor="longDescription">Long Description: </label>
        <textarea
          onChange={onChangeFormData}
          className="form-el"
          rows="5"
          id="longDescription"
          name="longDescription"
          required
        />
        <label htmlFor="price">Price of the Product: </label>
        <input
          onChange={onChangeFormData}
          className="form-el"
          type="text"
          id="price"
          name="price"
          required
        />
        <label htmlFor="category">Category: </label>
        <input
          onChange={onChangeFormData}
          className="form-el"
          type="text"
          id="category"
          name="category"
        />
        <label htmlFor="fileupload">Upload Files</label>
        <input
          onChange={onUploadChange}
          type="file"
          className="form-el"
          id="fileupload"
          name="fileupload"
          multiple
          accept="image/*"
          required
        />
        <div className="preview-container">
          {objectUrls.map((url, index) => (
            <div key={index} className="preview-item">
              <img src={url} alt="preview" className="preview-img" />
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button className="form-el" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
