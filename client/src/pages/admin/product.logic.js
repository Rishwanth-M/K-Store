// src/pages/admin/product.logic.js

import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

const CLOUD_NAME = "dafoanpxr";
const UPLOAD_PRESET = "kreedentials_store";
const API_BASE = "http://localhost:8080/products";

const EMPTY_PRODUCT = {
  name: "",
  category: "",
  color: "",
  productType: "",
  price: "",
  description: "",
  images: [],
  status: "draft",

  details: "",
  material: "",
  sizeGuide: "",
  delivery: "",
};

const EMPTY_VARIANT = { size: "", stock: "" };

export function useProductFormLogic(productId) {
  const toast = useToast();
  const isEditMode = Boolean(productId);

  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [variants, setVariants] = useState([EMPTY_VARIANT]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const fieldRefs = useRef({});

  /* Fetch product (edit mode) */
  useEffect(() => {
    if (!isEditMode) return;

    fetch(`${API_BASE}/${productId}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct({
          ...EMPTY_PRODUCT,
          ...data,
          price: String(data.price),
        });
        setVariants(
          data.variants?.length ? data.variants : [EMPTY_VARIANT]
        );
      });
  }, [productId, isEditMode]);

const isFirstLoad = useRef(true);

useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }
  setHasUnsavedChanges(true);
}, [product, variants]);


  const handleChange = (field, value) => {
    setProduct((p) => ({ ...p, [field]: value }));
  };

  const registerFieldRef = (field) => (el) => {
    if (el) fieldRefs.current[field] = el;
  };

  /* Variants */
  const addVariant = () => setVariants((v) => [...v, EMPTY_VARIANT]);

  const updateVariant = (i, field, value) => {
    setVariants((v) =>
      v.map((x, idx) => (idx === i ? { ...x, [field]: value } : x))
    );
  };

  const removeVariant = (i) => {
    setVariants((v) => v.filter((_, idx) => idx !== i));
  };

  /* Images */
  const handleImageUpload = async (file) => {
    if (!file || isUploading || product.images.length >= 4) return;

    setIsUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();

    setProduct((p) => ({
      ...p,
      images: [...p.images, data.secure_url],
    }));

    setIsUploading(false);
  };

  const handleImageRemove = (img) => {
    setProduct((p) => ({
      ...p,
      images: p.images.filter((i) => i !== img),
    }));
  };

  /* Validation */
  const validate = () => {
    const e = {};

    if (!product.name.trim()) e.name = "Product name required";
    if (!product.category) e.category = "Category required";
    if (!product.color.trim()) e.color = "Color required";
    if (!product.productType) e.productType = "Product type required";
    if (!product.price || product.price <= 0)
      e.price = "Price must be greater than 0";
    if (!product.images.length) e.images = "At least 1 image required";

    const seenSizes = new Set();
    variants.forEach((v, i) => {
  if (!v.size && !v.stock) return;

  if (!v.size) e[`variant-${i}`] = "Size required";
  if (v.stock < 0) e[`variant-${i}`] = "Invalid stock";

  if (seenSizes.has(v.size))
    e[`variant-${i}`] = "Duplicate size";

  seenSizes.add(v.size);
});


    setErrors(e);

    const first = Object.keys(e)[0];
    if (first && fieldRefs.current[first]) {
      fieldRefs.current[first].focus();
    }

    return Object.keys(e).length === 0;
  };

  /* Submit */
  const handleSubmit = async () => {
    if (!validate() || isSubmitting || isUploading) return;

    setIsSubmitting(true);

    const stock = variants.reduce(
      (sum, v) => sum + Number(v.stock || 0),
      0
    );

    const payload = {
      ...product,
      price: Number(product.price),
      variants: variants.map((v) => ({
        size: v.size,
        stock: Number(v.stock),
      })),
      stock,
    };

    const url = isEditMode
      ? `${API_BASE}/${productId}`
      : API_BASE;

    const method = isEditMode ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setIsSubmitting(false);

    if (!res.ok) {
      toast({ title: "Operation failed", status: "error" });
      return;
    }

    toast({
      title: isEditMode ? "Product updated" : "Product added",
      status: "success",
    });
    setHasUnsavedChanges(false);


    if (!isEditMode) {
      setProduct(EMPTY_PRODUCT);
      setVariants([EMPTY_VARIANT]);
      setHasUnsavedChanges(false);
    }
  };

  return {
    product,
    variants,
    errors,

    isEditMode,
    isSubmitting,
    isUploading,
    imageCount: product.images.length,

    handleChange,
    handleImageUpload,
    handleImageRemove,

    addVariant,
    updateVariant,
    removeVariant,

    handleSubmit,

    registerFieldRef,
    hasUnsavedChanges,
  };
}
