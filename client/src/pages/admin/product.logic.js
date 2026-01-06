import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/products`;

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
  const isFirstLoad = useRef(true);

  /* ================= FETCH (EDIT MODE) ================= */
  useEffect(() => {
    if (!isEditMode) return;

    fetch(`${API_BASE}/${productId}`)
      .then((r) => r.json())
      .then(({ product }) => {
        if (!product) return;

        setProduct({
          ...EMPTY_PRODUCT,
          ...product,
          price: String(product.price ?? ""),
        });

        setVariants(
          product.variants?.length
            ? product.variants.map((v) => ({
                size: v.size,
                stock: String(v.stock),
              }))
            : [EMPTY_VARIANT]
        );
      });
  }, [productId, isEditMode]);

  /* ================= UNSAVED CHANGES ================= */
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setHasUnsavedChanges(true);
  }, [product, variants]);

  /* ================= HELPERS ================= */
  const handleChange = (field, value) => {
    setProduct((p) => ({ ...p, [field]: value }));
  };

  const registerFieldRef = (field) => (el) => {
    if (el) fieldRefs.current[field] = el;
  };

  /* ================= VARIANTS ================= */
  const addVariant = () => setVariants((v) => [...v, EMPTY_VARIANT]);

  const updateVariant = (i, field, value) => {
    setVariants((v) =>
      v.map((x, idx) => (idx === i ? { ...x, [field]: value } : x))
    );
  };

  const removeVariant = (i) => {
    setVariants((v) => (v.length === 1 ? v : v.filter((_, idx) => idx !== i)));
  };

  /* ================= IMAGES ================= */
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

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};
    const seenSizes = new Set();

    if (!product.name.trim()) e.name = "Product name required";
    if (!product.category) e.category = "Category required";
    if (!product.color.trim()) e.color = "Color required";
    if (!product.productType) e.productType = "Product type required";
    if (!product.price || Number(product.price) <= 0)
      e.price = "Invalid price";
    if (!product.images.length) e.images = "At least one image required";

    variants.forEach((v, i) => {
      if (!v.size && !v.stock) return;

      if (!v.size) return (e[`variant-${i}`] = "Size required");
      if (Number(v.stock) < 0)
        return (e[`variant-${i}`] = "Invalid stock");

      if (seenSizes.has(v.size))
        return (e[`variant-${i}`] = "Duplicate size");

      seenSizes.add(v.size);
    });

    setErrors(e);

    const first = Object.keys(e)[0];
    if (first && fieldRefs.current[first]) {
      fieldRefs.current[first].focus();
    }

    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */
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
      variants: variants
        .filter((v) => v.size)
        .map((v) => ({
          size: v.size,
          stock: Number(v.stock),
        })),
      stock,
    };

    const url = isEditMode
      ? `${API_BASE}/${productId}`
      : API_BASE;

    const method = isEditMode ? "PUT" : "POST";

    const token = localStorage.getItem("token");

const res = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
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
    hasUnsavedChanges,

    handleChange,
    handleImageUpload,
    handleImageRemove,

    addVariant,
    updateVariant,
    removeVariant,

    handleSubmit,
    registerFieldRef,
  };
}
