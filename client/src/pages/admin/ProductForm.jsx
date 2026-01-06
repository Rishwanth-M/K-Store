import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Textarea,
  Stack,
  Divider,
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  Image,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./productForm.css";
import { useProductFormLogic } from "./product.logic";

const PRODUCT_TYPES = [
  "Combo",
  "Jacket",
  "T-Shirt",
  "Short",
  "T-Shirt & Shorts",
  "Socks",
  "Cap",
  "Inner",
  "Visor",
];

const SIZES = ["S", "M", "L", "XL", "Free"];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    variants,
    errors,
    isEditMode,
    isSubmitting,
    isUploading,
    imageCount,
    hasUnsavedChanges,

    handleChange,
    handleImageUpload,
    handleImageRemove,
    addVariant,
    updateVariant,
    removeVariant,
    handleSubmit,
    registerFieldRef,
  } = useProductFormLogic(id);

  /* ===== UNSAVED CHANGES WARNING ===== */
  useEffect(() => {
    const handler = (e) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const handleBack = () => {
    if (hasUnsavedChanges && !window.confirm("Discard changes?")) return;
    navigate("/admin/products");
  };

  return (
    <Box className="product-form-page">
      <Box className="product-form-card">
        <Button variant="ghost" size="sm" mb="4" onClick={handleBack}>
          ← Back to Products
        </Button>

        <Heading size="lg" mb="6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </Heading>

        {/* BASIC INFO */}
        <Stack spacing="4">
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              ref={registerFieldRef("name")}
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.category} isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              ref={registerFieldRef("category")}
              value={product.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="unisex">Unisex</option>
            </Select>
            <FormErrorMessage>{errors.category}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.color} isRequired>
            <FormLabel>Color</FormLabel>
            <Input
              ref={registerFieldRef("color")}
              value={product.color}
              onChange={(e) => handleChange("color", e.target.value)}
            />
            <FormErrorMessage>{errors.color}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.productType} isRequired>
            <FormLabel>Product Type</FormLabel>
            <Select
              ref={registerFieldRef("productType")}
              value={product.productType}
              onChange={(e) => handleChange("productType", e.target.value)}
            >
              <option value="">Select product type</option>
              {PRODUCT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.productType}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.price} isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              ref={registerFieldRef("price")}
              value={product.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </FormControl>
        </Stack>

        <Divider my="6" />

        {/* STATUS */}
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Product Status</FormLabel>
          <Switch
            isChecked={product.status === "active"}
            onChange={(e) =>
              handleChange("status", e.target.checked ? "active" : "draft")
            }
          />
          <Text ml="3" fontSize="sm">
            {product.status === "active" ? "Active" : "Draft"}
          </Text>
        </FormControl>

        <Divider my="6" />

        {/* IMAGES */}
        <Heading size="md" mb="3">
          Images ({imageCount}/4)
        </Heading>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          isDisabled={isUploading || imageCount >= 4}
        />

        {isUploading && (
          <Box mt="2">
            <Spinner size="sm" /> Uploading image...
          </Box>
        )}

        <SimpleGrid columns={[2, 4]} spacing="3" mt="4">
          {product.images.map((img) => (
            <Box key={img} position="relative">
              <Image src={img} borderRadius="8px" />
              <IconButton
                icon={<DeleteIcon />}
                size="xs"
                colorScheme="red"
                position="absolute"
                top="5px"
                right="5px"
                onClick={() => handleImageRemove(img)}
              />
            </Box>
          ))}
        </SimpleGrid>

        <Divider my="6" />

        {/* VARIANTS */}
        <Heading size="md" mb="3">
          Sizes & Stock
        </Heading>

        {variants.map((v, index) => (
          <SimpleGrid key={index} columns={[1, 3]} spacing="3" mb="3">
            <Select
              value={v.size}
              onChange={(e) => updateVariant(index, "size", e.target.value)}
            >
              <option value="">Select Size</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>

            <Input
              type="number"
              placeholder="Stock"
              value={v.stock}
              onChange={(e) =>
                updateVariant(index, "stock", e.target.value)
              }
            />

            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => removeVariant(index)}
            />
          </SimpleGrid>
        ))}

        <Button leftIcon={<AddIcon />} variant="outline" onClick={addVariant}>
          Add Size
        </Button>

        <Divider my="6" />

        {/* EXTRA DETAILS */}
        <Accordion allowToggle>
          {[
            ["Product Details", "details"],
            ["Material & Fit", "material"],
            ["Size & Fit Guide", "sizeGuide"],
            ["Delivery & Returns", "delivery"],
          ].map(([label, key]) => (
            <AccordionItem key={key}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {label}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Textarea
                  value={product[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Divider my="8" />

        {/* ACTION */}
        <Button
          colorScheme="blue"
          size="lg"
          width="100%"
          isDisabled={isSubmitting || isUploading}
          onClick={handleSubmit}
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
            ? "Update Product"
            : "Save Product"}
        </Button>
      </Box>
    </Box>
  );
}
