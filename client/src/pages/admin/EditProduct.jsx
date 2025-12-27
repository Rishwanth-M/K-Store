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


const CLOUD_NAME = "dafoanpxr";
const UPLOAD_PRESET = "kreedentials_store";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
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


        setLoading(false);
      });
  }, [id]);

  /* ---------- IMAGE UPLOAD ---------- */
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

  const removeImage = (img) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i !== img),
    }));
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async () => {
    const payload = {
  name: product.name,
  price: Number(product.price),
  category: product.category,
  productType: product.productType,
  description: product.description,

  images: product.images,
  sizes: product.sizes,
  stock: Number(product.stock),

  colors: product.colors.split(",").map(c => c.trim()),

  specs: product.specs.split("\n").map(s => s.trim()).filter(Boolean),

  productDetails: {
    includes: product.productDetails.includes.split("\n").filter(Boolean),
    occasion: product.productDetails.occasion,
    idealFor: product.productDetails.idealFor,
  },

  materialAndFit: product.materialAndFit,

  careInstructions: product.careInstructions.split("\n").filter(Boolean),

  sizeAndFitGuide: product.sizeAndFitGuide,

  deliveryAndReturns: product.deliveryAndReturns,
};



    const res = await fetch(
      `http://localhost:8080/products/${id}`,
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

    alert("Product updated");
    navigate("/admin/products");
  };

  if (loading || !product) return null;

  return (
    <Box maxW="1000px" mx="auto" p="30px">
      <Heading mb="30px">Edit Product</Heading>

      {/* BASIC INFO */}
      <Stack spacing="14px">
        <Input
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />
        <Input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />
        <Input
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: e.target.value })
          }
        />

        <Select
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
          value={product.productType}
          onChange={(e) =>
            setProduct({
              ...product,
              productType: e.target.value,
            })
          }
        />

        <Input
          value={product.colors}
          onChange={(e) =>
            setProduct({ ...product, colors: e.target.value })
          }
        />

        <Textarea
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />
      </Stack>

      <Divider my="30px" />

      {/* IMAGES */}
      <Heading size="md" mb="10px">
        Images
      </Heading>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />

      <SimpleGrid columns={[2, 3]} spacing="10px" mt="12px">
        {product.images.map((img) => (
          <Box key={img} position="relative">
            <Image src={img} borderRadius="8px" />
            <Button
              size="xs"
              colorScheme="red"
              position="absolute"
              top="5px"
              right="5px"
              onClick={() => removeImage(img)}
            >
              ✕
            </Button>
          </Box>
        ))}
      </SimpleGrid>

      <Divider my="30px" />

      {/* SIZES */}
      <Heading size="md">Sizes</Heading>
      <CheckboxGroup
        value={product.sizes}
        onChange={(vals) =>
          setProduct({ ...product, sizes: vals })
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

      {/* SPECS */}
      {/* PRODUCT DETAILS */}
<Heading size="md">Product Details</Heading>

<Textarea
  placeholder="Includes (one per line)"
  value={product.productDetails?.includes || ""}
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
  value={product.productDetails?.occasion || ""}
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
  value={product.productDetails?.idealFor || ""}
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
  value={product.materialAndFit?.material || ""}
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
  value={product.materialAndFit?.fit || ""}
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
  value={product.materialAndFit?.sleeve || ""}
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
  value={product.materialAndFit?.neckType || ""}
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

{/* CARE INSTRUCTIONS */}
<Heading size="md">Care Instructions</Heading>

<Textarea
  placeholder="Each instruction on new line"
  value={product.careInstructions || ""}
  onChange={(e) =>
    setProduct({
      ...product,
      careInstructions: e.target.value,
    })
  }
/>

<Divider my="30px" />

{/* SIZE & FIT GUIDE */}
<Heading size="md">Size & Fit Guide</Heading>

<Input
  placeholder="Model Height"
  value={product.sizeAndFitGuide?.modelHeight || ""}
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
  value={product.sizeAndFitGuide?.modelSize || ""}
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
  value={product.sizeAndFitGuide?.fitNote || ""}
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

{/* DELIVERY & RETURNS */}
<Heading size="md">Delivery & Returns</Heading>

<Input
  placeholder="Delivery Time"
  value={product.deliveryAndReturns?.deliveryTime || ""}
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
  value={product.deliveryAndReturns?.deliveryDays || ""}
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
  value={product.deliveryAndReturns?.deliveryNote || ""}
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
  value={product.deliveryAndReturns?.returnPolicy || ""}
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

{/* PRODUCT INFORMATION (SPECS) */}
<Heading size="md">Product Information</Heading>

<Textarea
  placeholder="Each spec on new line"
  value={product.specs}
  onChange={(e) =>
    setProduct({ ...product, specs: e.target.value })
  }
/>


      <Divider my="40px" />

      <Button colorScheme="green" size="lg" onClick={handleUpdate}>
        Update Product
      </Button>
    </Box>
  );
};
