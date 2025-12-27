import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  Stack,
  Textarea,
  Divider,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";




const CLOUD_NAME = "dafoanpxr";
const UPLOAD_PRESET = "kreedentials_store";

export const AddProduct = () => {
      // 🔹 add / edit mode
  const [mode, setMode] = useState("add");

  // 🔹 currently editing product id
  const [editingId, setEditingId] = useState(null);

  // 🔹 list of existing products
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    productType: "",
    description: "",

    images: [],
    sizes: [],
    colors: "",
    stock: "",

    productDetails: {
      includes: "",
      occasion: "",
      idealFor: "",
    },

    materialAndFit: {
      material: "",
      fit: "",
      sleeve: "",
      neckType: "",
    },

    careInstructions: "",

    sizeAndFitGuide: {
      modelHeight: "",
      modelSize: "",
      fitNote: "",
    },

    deliveryAndReturns: {
      deliveryTime: "",
      deliveryDays: "",
      deliveryNote: "",
      returnPolicy: "",
    },

    specs: "",
  });

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "AllProducts");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, data.secure_url],
    }));
  };

  

useEffect(() => {
  fetch("http://localhost:8080/products")
    .then(res => res.json())
    .then(setProducts);
}, []);


const handleEditClick = (data) => {
  setMode("edit");
  setEditingId(data._id);

  setProduct({
    ...data,

    colors: data.colors.join(", "),
    specs: data.specs.join("\n"),

    productDetails: {
      includes: data.productDetails?.includes?.join("\n") || "",
      occasion: data.productDetails?.occasion || "",
      idealFor: data.productDetails?.idealFor || "",
    },

    materialAndFit: {
      material: data.materialAndFit?.material || "",
      fit: data.materialAndFit?.fit || "",
      sleeve: data.materialAndFit?.sleeve || "",
      neckType: data.materialAndFit?.neckType || "",
    },

    careInstructions: data.careInstructions?.join("\n") || "",

    sizeAndFitGuide: {
      modelHeight: data.sizeAndFitGuide?.modelHeight || "",
      modelSize: data.sizeAndFitGuide?.modelSize || "",
      fitNote: data.sizeAndFitGuide?.fitNote || "",
    },

    deliveryAndReturns: {
      deliveryTime: data.deliveryAndReturns?.deliveryTime || "",
      deliveryDays: data.deliveryAndReturns?.deliveryDays || "",
      deliveryNote: data.deliveryAndReturns?.deliveryNote || "",
      returnPolicy: data.deliveryAndReturns?.returnPolicy || "",
    },
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};



  /* ---------------- BUILD PAYLOAD ---------------- */
  const buildProductPayload = () => ({
  name: product.name.trim(),
  price: Number(product.price),
  category: product.category,
  productType: product.productType,
  description: product.description.trim(),

  images: product.images,
  sizes: product.sizes,
  colors: product.colors.split(",").map(c => c.trim()),
  stock: Number(product.stock),

  specs: product.specs
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean),

  productDetails: {
    includes: product.productDetails.includes
      .split("\n")
      .map(i => i.trim())
      .filter(Boolean),
    occasion: product.productDetails.occasion,
    idealFor: product.productDetails.idealFor,
  },

  materialAndFit: product.materialAndFit,

  careInstructions: product.careInstructions
    .split("\n")
    .map(c => c.trim())
    .filter(Boolean),

  sizeAndFitGuide: product.sizeAndFitGuide,

  deliveryAndReturns: product.deliveryAndReturns,
});


  /* ---------------- VALIDATION ---------------- */
  const validateProduct = (payload) => {
    if (!payload.name) return "Product name is required";
    if (!payload.category) return "Category is required";
    if (!payload.productType) return "Product type is required";
    if (payload.price <= 0) return "Invalid price";
    if (payload.stock < 0) return "Invalid stock";
    if (!payload.images || payload.images.length < 3)
      return "Minimum 3 images required";
    if (!payload.sizes || payload.sizes.length === 0)
      return "Select at least one size";
    return null;
  };

  /* ---------------- SAVE ---------------- */
  const handleSubmit = async () => {
  const payload = buildProductPayload();
  const error = validateProduct(payload);

  if (error) {
    alert(error);
    return;
  }

  const url =
    mode === "add"
      ? "http://localhost:8080/products"
      : `http://localhost:8080/products/${editingId}`;

  const method = mode === "add" ? "POST" : "PUT";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    alert("Operation failed");
    return;
  }

  alert(mode === "add" ? "Product added" : "Product updated");

  setMode("add");
  setEditingId(null);

  // refresh product list
  const updated = await fetch("http://localhost:8080/products").then(r => r.json());
  setProducts(updated);
};


  return (
    <Box maxW="1000px" mx="auto" p="30px">
      <Heading mb="30px">Add Product</Heading>

      {/* BASIC INFO */}
      <Stack spacing="14px">
        <Input
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <Input
          placeholder="Price"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />

        <Input
          placeholder="Stock Quantity"
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: e.target.value })
          }
        />

        <Select
          placeholder="Category"
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        >
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="unisex">Unisex</option>
        </Select>

        <Input
          placeholder="Product Type (tshirt, combo, socks)"
          value={product.productType}
          onChange={(e) =>
            setProduct({ ...product, productType: e.target.value })
          }
        />

        <Input
          placeholder="Colors (comma separated)"
          value={product.colors}
          onChange={(e) =>
            setProduct({ ...product, colors: e.target.value })
          }
        />

        <Textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </Stack>

      <Divider my="30px" />

      {/* IMAGES */}
      <Heading size="md" mb="10px">
        Upload Images (min 3)
      </Heading>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />

      {product.images.length > 0 && (
        <SimpleGrid columns={[2, 3]} spacing="10px" mt="12px">
          {product.images.map((img, i) => (
            <Image key={i} src={img} borderRadius="8px" />
          ))}
        </SimpleGrid>
      )}

      <Divider my="30px" />

      {/* SIZES */}
      <Heading size="md" mb="10px">
        Sizes
      </Heading>
      <CheckboxGroup
        value={product.sizes}
        onChange={(values) =>
          setProduct({ ...product, sizes: values })
        }
      >
        <Stack direction="row">
          {["S", "M", "L", "XL"].map((s) => (
            <Checkbox key={s} value={s}>
              {s}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Divider my="30px" />

      {/* PRODUCT DETAILS */}
      <Heading size="md">Product Details</Heading>
      <Textarea
        placeholder="Includes (one per line)"
        value={product.productDetails.includes}
        onChange={(e) =>
          setProduct({
            ...product,
            productDetails: {
              ...product.productDetails,
              includes: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Occasion"
        value={product.productDetails.occasion}
        onChange={(e) =>
          setProduct({
            ...product,
            productDetails: {
              ...product.productDetails,
              occasion: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Ideal For"
        value={product.productDetails.idealFor}
        onChange={(e) =>
          setProduct({
            ...product,
            productDetails: {
              ...product.productDetails,
              idealFor: e.target.value,
            },
          })
        }
      />

      <Divider my="30px" />

      {/* MATERIAL & FIT */}
      <Heading size="md">Material & Fit</Heading>
      <Input
        placeholder="Material"
        value={product.materialAndFit.material}
        onChange={(e) =>
          setProduct({
            ...product,
            materialAndFit: {
              ...product.materialAndFit,
              material: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Fit"
        value={product.materialAndFit.fit}
        onChange={(e) =>
          setProduct({
            ...product,
            materialAndFit: {
              ...product.materialAndFit,
              fit: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Sleeve"
        value={product.materialAndFit.sleeve}
        onChange={(e) =>
          setProduct({
            ...product,
            materialAndFit: {
              ...product.materialAndFit,
              sleeve: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Neck Type"
        value={product.materialAndFit.neckType}
        onChange={(e) =>
          setProduct({
            ...product,
            materialAndFit: {
              ...product.materialAndFit,
              neckType: e.target.value,
            },
          })
        }
      />

      <Divider my="30px" />

      {/* CARE */}
      <Heading size="md">Care Instructions</Heading>
      <Textarea
        placeholder="Each instruction on new line"
        value={product.careInstructions}
        onChange={(e) =>
          setProduct({ ...product, careInstructions: e.target.value })
        }
      />

      <Divider my="30px" />

      {/* SIZE GUIDE */}
      <Heading size="md">Size & Fit Guide</Heading>
      <Input
        placeholder="Model Height"
        value={product.sizeAndFitGuide.modelHeight}
        onChange={(e) =>
          setProduct({
            ...product,
            sizeAndFitGuide: {
              ...product.sizeAndFitGuide,
              modelHeight: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Model Size"
        value={product.sizeAndFitGuide.modelSize}
        onChange={(e) =>
          setProduct({
            ...product,
            sizeAndFitGuide: {
              ...product.sizeAndFitGuide,
              modelSize: e.target.value,
            },
          })
        }
      />
      <Textarea
        placeholder="Fit Note"
        value={product.sizeAndFitGuide.fitNote}
        onChange={(e) =>
          setProduct({
            ...product,
            sizeAndFitGuide: {
              ...product.sizeAndFitGuide,
              fitNote: e.target.value,
            },
          })
        }
      />

      <Divider my="30px" />

      {/* DELIVERY */}
      <Heading size="md">Delivery & Returns</Heading>
      <Input
        placeholder="Delivery Time"
        value={product.deliveryAndReturns.deliveryTime}
        onChange={(e) =>
          setProduct({
            ...product,
            deliveryAndReturns: {
              ...product.deliveryAndReturns,
              deliveryTime: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Delivery Days"
        value={product.deliveryAndReturns.deliveryDays}
        onChange={(e) =>
          setProduct({
            ...product,
            deliveryAndReturns: {
              ...product.deliveryAndReturns,
              deliveryDays: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Delivery Note"
        value={product.deliveryAndReturns.deliveryNote}
        onChange={(e) =>
          setProduct({
            ...product,
            deliveryAndReturns: {
              ...product.deliveryAndReturns,
              deliveryNote: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Return Policy"
        value={product.deliveryAndReturns.returnPolicy}
        onChange={(e) =>
          setProduct({
            ...product,
            deliveryAndReturns: {
              ...product.deliveryAndReturns,
              returnPolicy: e.target.value,
            },
          })
        }
      />

      <Divider my="30px" />

      {/* SPECS */}
      <Heading size="md">Product Information (Specs)</Heading>
      <Textarea
        placeholder="Each spec on new line"
        value={product.specs}
        onChange={(e) =>
          setProduct({ ...product, specs: e.target.value })
        }
      />

      <Divider my="40px" />

      <Divider my="50px" />

<Heading size="md" mb="20px">
  Existing Products
</Heading>

<Stack spacing="12px">
  {products.map((p) => (
    <Box
      key={p._id}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="12px 16px"
      border="1px solid #e2e8f0"
      borderRadius="8px"
    >
      <Text fontWeight={500}>{p.name}</Text>

      <Button
        size="sm"
        variant="outline"
        onClick={() => handleEditClick(p)}
      >
        Edit
      </Button>
    </Box>
  ))}
</Stack>


      <Button
  colorScheme="blue"
  size="lg"
  onClick={handleSubmit}
>
  {mode === "add" ? "Save Product" : "Update Product"}
</Button>

    </Box>
  );
};
