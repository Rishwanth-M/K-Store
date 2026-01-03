/* ===============================
   OBJECT UTIL
================================ */
export const convertObject = (obj = {}) => {
  const ans = {};
  for (let k1 in obj) {
    ans[k1] = [];
    for (let k2 in obj[k1]) {
      if (obj[k1][k2]) ans[k1].push(k2);
    }
  }
  return ans;
};


/* ===============================
   SAFE NUMBER FORMATTER
   🔥 NEVER CRASHES
================================ */
export const numberWithCommas = (value) => {
  if (value === undefined || value === null) return "0";

  const num = Number(value);

  if (Number.isNaN(num)) return "0";

  return num.toLocaleString("en-IN");
};


/* ===============================
   TOAST HELPER (SAFE)
================================ */
export const setToast = (
  toast,
  title,
  status = "info",
  duration = 2000,
  description
) => {
  // ✅ SAFETY CHECK (FIXES YOUR ERROR)
  if (typeof toast !== "function") return;

  toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    position: "top",
  });
};



/* ===============================
   CATEGORY / GENDER
================================ */
export const getGender = (category) => {
  return !["boys", "girls"].includes(category);
};


/* ===============================
   SAFE STRING SHORTENER
================================ */
export const shortString = (text = "", limit = 15) => {
  if (typeof text !== "string") return "";
  return text.length > limit
    ? text.slice(0, limit) + "..."
    : text;
};
