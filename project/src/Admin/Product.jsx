import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inch, setInch] = useState("");
  const [editId, setEditId]= useState(null);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
      return;

    }

    fetchProduct();
    
  }, [navigate]);

    const fetchProduct= async ()=>{
        try{
          const res= await fetch("http://localhost:5000/products")
          const data= await res.json();
          setProducts(data);
        }catch(err){
          console.log("fetch error", err);
        }
    }

  const addProduct = async() => {
    if (!name || !category || !price || !image || !inch) {
      alert("Please fill all fields");
      return;
    }

//     const newProduct = {
//       name,
//       category,
//       price: Number(price),
//       image,
//       inch,
//     };

//     try{
//       const res=await fetch("http://localhost:5000/products",{
//         method:"POST",
//         headers:{"Content-Type" : "application/json"},
//         body: JSON.stringify(newProduct)
//       });
//       const savedProduct= await res.json()
    

//     setProducts([...products,savedProduct]);
//     setName("");
//     setCategory("");
//     setPrice("");
//     setImage("");
//     setInch("");
//   }catch(err){
//       console.log("Failed", err)
//   }


    if(editId){
      try{
      const res=await fetch(`http://localhost:5000/products/${editId}`,{
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify({name,category,price:Number(price),inch,image}),
      })
      const updateProduct =await res.json()
      setProducts(products.map((p)=>(p.id===editId ? updateProduct : p)))
      clearform();
      }catch(err){
          console.log("failed",err)
      }
      return;
    }
    const newProduct={name,category,price:Number(price),inch,image};
    try{
      const res=await fetch("http://localhost:5000/products",{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(newProduct),
      })
      const savedProduct=await res.json();
      setProducts([...products,savedProduct]);
      clearform();
    }catch(err){
      console.log("Failed",err)
    }
  }

  const deleteProduct=async (id)=>{
      try{
       await fetch(`http://localhost:5000/products/${id}`,{
        method:"DELETE",
       })
       setProducts(products.filter((p)=>p.id !==id));
      }catch(err){
        console.log("Failed",err)
      }
  };

  const editProduct=(product)=>{
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setImage(product.image);
    setInch(product.inch);
    setEditId(product.id)
  };

  const clearform=()=>{
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
    setInch("");
    setEditId(null);
  }


  return (
    <div className="dash-container">
      <h2 className="dash-title">Admin Products</h2>

      <div className="add-product">
        <h3>Add Product</h3>

        <input
          className="dash-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="dash-input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="dash-input"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="dash-input"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="dash-input"
          placeholder="Inch"
          value={inch}
          onChange={(e) => setInch(e.target.value)}
        />

        <button className="dash-btn" onClick={addProduct}>
          Add Product
        </button>
      </div>

      <hr />

      <h3 className="list-title">All Products</h3>

      <div className="product-list">
        {products.length === 0 && <p>No products found</p>}

        {products.map((p) => (
          <div key={p.id} className="product-item">
            <img src={p.image} alt={p.name} className="product-img" />

            <div className="product-info">
              <strong>{p.name}</strong>
              <p>Category: {p.category}</p>
              <p>Price: ${p.price}</p>
              <p>Inch: {p.inch}</p>
            </div>
            <button className="edit-btn" onClick={()=> editProduct(p)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

