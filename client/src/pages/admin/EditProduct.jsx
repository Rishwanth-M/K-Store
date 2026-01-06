import {
  Box,
  Button,
  Heading,
  Divider,
  Input,
  Select,
  Stack,
  Textarea,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;


export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    productType: "",
    color: "",
    price: 0,
    description: "",
    images: [],
    variants: [],
    stock: 0,
    details: "",
    material: "",
    sizeGuide: "",
    delivery: "",
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`)
      .then((res) => res.json())
      .then(({ product }) => {
        setProduct({
          name: product.name || "",
          category: product.category || "",
          productType: product.productType || "",
          color: product.color || "",
          price: Number(product.price) || 0,
          description: product.description || "",
          images: product.images || [],
          variants: product.variants || [],
          stock: Number(product.stock) || 0,
          details: product.details || "",
          material: product.material || "",
          sizeGuide: product.sizeGuide || "",
          delivery: product.delivery || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
  const handleVariantChange = (sizes) => {
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

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const payload = {
      ...product,
      variants: product.variants.length ? product.variants : undefined,
    };

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    alert("Product updated successfully");
    navigate("/admin/products");
  };

  if (loading) return <Heading p="40px">Loading...</Heading>;

  return (
    <Box maxW="900px" mx="auto" p="30px">
      <Heading mb="30px">Edit Product</Heading>

      <Stack spacing="14px">
        <Input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <Input value={product.productType} onChange={(e) => setProduct({ ...product, productType: e.target.value })} />
        <Input value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value })} />
        <Input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
        <Textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />

        <Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="unisex">Unisex</option>
        </Select>
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
        onChange={handleVariantChange}
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

      <Button mt="40px" colorScheme="green" size="lg" onClick={handleUpdate}>
        Update Product
      </Button>
    </Box>
  );
};
