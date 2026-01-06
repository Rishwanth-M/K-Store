import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  Divider,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;


const emptyProduct = {
  name: "",
  category: "",
  productType: "",
  color: "",
  price: "",
  description: "",
  images: [],
  variants: [],
  stock: "",
  details: "",
  material: "",
  sizeGuide: "",
  delivery: "",
};

export const AddProduct = () => {
  const [mode, setMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);

  /* ================= FETCH PRODUCTS ================= */
  const loadProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();

    setProduct((p) => ({
      ...p,
      images: [...p.images, data.secure_url],
    }));
  };

  const removeImage = (img) => {
    setProduct((p) => ({
      ...p,
      images: p.images.filter((i) => i !== img),
    }));
  };

  /* ================= VARIANTS ================= */
  const handleSizeChange = (sizes) => {
    const updated = sizes.map((s) => {
      const existing = product.variants.find((v) => v.size === s);
      return existing || { size: s, stock: 0 };
    });
    setProduct({ ...product, variants: updated });
  };

  const updateVariantStock = (size, stock) => {
    setProduct({
      ...product,
      variants: product.variants.map((v) =>
        v.size === size ? { ...v, stock } : v
      ),
    });
  };

  /* ================= EDIT ================= */
  const handleEditClick = (p) => {
    setMode("edit");
    setEditingId(p._id);
    setProduct({
      name: p.name || "",
      category: p.category || "",
      productType: p.productType || "",
      color: p.color || "",
      price: p.price || "",
      description: p.description || "",
      images: p.images || [],
      variants: p.variants || [],
      stock: p.stock || "",
      details: p.details || "",
      material: p.material || "",
      sizeGuide: p.sizeGuide || "",
      delivery: p.delivery || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    if (!product.name || !product.category || !product.productType) {
      alert("Required fields missing");
      return;
    }

    if (product.images.length < 3) {
      alert("Minimum 3 images required");
      return;
    }

    const url =
      mode === "add"
        ? `${import.meta.env.VITE_BACKEND_URL}/products`
        : `http://localhost:8080/products/${editingId}`;

    const method = mode === "add" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      alert("Operation failed");
      return;
    }

    alert(mode === "add" ? "Product added" : "Product updated");

    setMode("add");
    setEditingId(null);
    setProduct(emptyProduct);
    loadProducts();
  };

  /* ================= UI ================= */
  return (
    <Box maxW="900px" mx="auto" p="30px">
      <Heading mb="30px">
        {mode === "add" ? "Add Product" : "Edit Product"}
      </Heading>

      <Stack spacing="14px">
        <Input placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <Input placeholder="Product Type" value={product.productType} onChange={(e) => setProduct({ ...product, productType: e.target.value })} />
        <Input placeholder="Color" value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value })} />
        <Input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />

        <Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
          <option value="">Select category</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="unisex">Unisex</option>
        </Select>

        <Textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      </Stack>

      <Divider my="30px" />

      <Heading size="md">Images</Heading>
      <Input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
      <SimpleGrid columns={3} mt="10px">
        {product.images.map((img) => (
          <Box key={img} position="relative">
            <Image src={img} />
            <Button size="xs" colorScheme="red" onClick={() => removeImage(img)}>✕</Button>
          </Box>
        ))}
      </SimpleGrid>

      <Divider my="30px" />

      <Heading size="md">Sizes & Stock</Heading>
      <CheckboxGroup
        value={product.variants.map((v) => v.size)}
        onChange={handleSizeChange}
      >
        <Stack direction="row">
          {["S", "M", "L", "XL"].map((s) => (
            <Checkbox key={s} value={s}>{s}</Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      {product.variants.map((v) => (
        <Input
          key={v.size}
          type="number"
          placeholder={`${v.size} stock`}
          value={v.stock}
          onChange={(e) => updateVariantStock(v.size, Number(e.target.value))}
          mt="8px"
        />
      ))}

      <Divider my="30px" />

      <Textarea placeholder="Details" value={product.details} onChange={(e) => setProduct({ ...product, details: e.target.value })} />
      <Textarea placeholder="Material" value={product.material} onChange={(e) => setProduct({ ...product, material: e.target.value })} />
      <Textarea placeholder="Size Guide" value={product.sizeGuide} onChange={(e) => setProduct({ ...product, sizeGuide: e.target.value })} />
      <Textarea placeholder="Delivery & Returns" value={product.delivery} onChange={(e) => setProduct({ ...product, delivery: e.target.value })} />

      <Button mt="40px" colorScheme="blue" size="lg" onClick={handleSubmit}>
        {mode === "add" ? "Save Product" : "Update Product"}
      </Button>

      <Divider my="50px" />

      <Heading size="md" mb="20px">Existing Products</Heading>
      <Stack spacing="12px">
        {products.map((p) => (
          <Box key={p._id} p="12px" border="1px solid #e2e8f0" borderRadius="8px" display="flex" justifyContent="space-between">
            <Text>{p.name}</Text>
            <Button size="sm" onClick={() => handleEditClick(p)}>Edit</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
